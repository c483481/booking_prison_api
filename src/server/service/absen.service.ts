import { isValid } from "ulidx";
import { AbsenRepository, AppRepositoryMap, NapiRepository } from "../../contract/repository.contract";
import { AbsenCreation_Payload, AbsenResult } from "../dto/absen.dto";
import { BaseService } from "./base.service";
import { errorResponses } from "../../response";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { AbsenAttrribute, AbsenCreationAttribute } from "../model/absen.model";
import { AbsenService } from "../../contract/service.contract";
import { ListResult, List_Payload } from "../../module/dto.module";

export class Absen extends BaseService implements AbsenService {
    private absenRepo!: AbsenRepository;
    private napiRepo!: NapiRepository;
    init(repository: AppRepositoryMap): void {
        this.absenRepo = repository.absen;
        this.napiRepo = repository.napi;
    }

    createAbsen = async (payload: AbsenCreation_Payload): Promise<AbsenResult> => {
        const { userSession, xid, tema } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const napi = await this.napiRepo.findByXid(xid);

        if (!napi) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const createdValues = createData<AbsenCreationAttribute>(
            {
                name: napi.name,
                napiXid: xid,
                cell: napi.cell,
                tema,
            },
            userSession
        );

        const result = await this.absenRepo.insertAbsen(createdValues);

        return composeAbsen(result);
    };

    listAbsen = async (payload: List_Payload): Promise<ListResult<AbsenResult>> => {
        const result = await this.absenRepo.findAbsen(payload);

        const items = compose(result.rows, composeAbsen);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeAbsen(row: AbsenAttrribute): AbsenResult {
    return composeResult(row, {
        name: row.name,
        napiXid: row.napiXid,
        cell: row.cell,
        tema: row.tema,
    });
}
