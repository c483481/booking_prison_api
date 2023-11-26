import { AppRepositoryMap, CellRepository } from "../../contract/repository.contract";
import { CellService } from "../../contract/service.contract";
import { ListResult, List_Payload } from "../../module/dto.module";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { CellCreation_Payload, CellResult } from "../dto/cell.dto";
import { CellAttributes, CellCrationAttributes } from "../model/cell.model";
import { BaseService } from "./base.service";

export class Cell extends BaseService implements CellService {
    private cellRepo!: CellRepository;
    init(repository: AppRepositoryMap): void {
        this.cellRepo = repository.cell;
    }

    createCell = async (payload: CellCreation_Payload): Promise<CellResult> => {
        const { name, max } = payload;

        const createdValues = createData<CellCrationAttributes>({
            name,
            max,
            count: 0,
        });

        const result = await this.cellRepo.insertCell(createdValues);

        return composeCell(result);
    };

    getListCell = async (payload: List_Payload): Promise<ListResult<CellResult>> => {
        const result = await this.cellRepo.findCell(payload);

        const items = compose(result.rows, composeCell);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeCell(row: CellAttributes): CellResult {
    return composeResult(row, {
        name: row.name,
        max: row.max,
        count: row.count,
    });
}
