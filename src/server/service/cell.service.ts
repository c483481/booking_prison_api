import { AppRepositoryMap, CellRepository } from "../../contract/repository.contract";
import { composeResult, createData } from "../../utils/helper.utils";
import { CellCreation_Payload, CellResult } from "../dto/cell.dto";
import { CellAttributes, CellCrationAttributes } from "../model/cell.model";
import { BaseService } from "./base.service";

export class Cell extends BaseService {
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
}

export function composeCell(row: CellAttributes): CellResult {
    return composeResult(row, {
        name: row.name,
        max: row.max,
        count: row.count,
    });
}
