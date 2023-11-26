import { DateTime } from "luxon";
import { AppRepositoryMap, CellRepository, NapiRepository } from "../../contract/repository.contract";
import { errorResponses } from "../../response";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { NapiCreation_Payload, NapiResult } from "../dto/napi.dto";
import { BaseService } from "./base.service";
import { NapiAttributes, NapiCreationAttributes } from "../model/napi.model";
import { toUnixEpoch } from "../../utils/date.utils";
import { NapiService } from "../../contract/service.contract";
import { ListResult, List_Payload } from "../../module/dto.module";

export class Napi extends BaseService implements NapiService {
    private napiRepo!: NapiRepository;
    private cellRepo!: CellRepository;
    init(repository: AppRepositoryMap): void {
        this.napiRepo = repository.napi;
        this.cellRepo = repository.cell;
    }

    createNapi = async (payload: NapiCreation_Payload): Promise<NapiResult> => {
        const { cellXid, name, longTime, userSession, reason } = payload;

        if (!cellXid) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const cell = await this.cellRepo.findCellByXid(cellXid);

        if (!cell) {
            throw errorResponses.getError("E_FOUND_1");
        }

        if (cell.count === cell.max) {
            throw errorResponses.getError("E_REC_2");
        }

        const dateOut = DateTime.local()
            .plus({ year: longTime })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toJSDate();

        const createdValues = createData<NapiCreationAttributes>(
            {
                name,
                dateOut,
                cell: cell.name,
                reason,
            },
            userSession
        );

        const result = await this.napiRepo.insertNapi(createdValues);

        return composeNapi(result);
    };

    listNapi = async (payload: List_Payload): Promise<ListResult<NapiResult>> => {
        const result = await this.napiRepo.findNapi(payload);

        const items = compose(result.rows, composeNapi);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeNapi(row: NapiAttributes): NapiResult {
    return composeResult(row, {
        name: row.name,
        reason: row.reason,
        cell: row.cell,
        dateOut: toUnixEpoch(row.dateOut),
    });
}
