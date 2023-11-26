import { CellRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { Cell, CellAttributes, CellCrationAttributes } from "../model/cell.model";
import { BaseRepository } from "./base.repository";

export class SequelizeCellRepository extends BaseRepository implements CellRepository {
    private cell!: typeof Cell;
    init(datasource: AppDataSource): void {
        this.cell = datasource.sqlModel.Cell;
    }

    insertCell = async (payload: CellCrationAttributes): Promise<CellAttributes> => {
        return this.cell.create(payload);
    };
}
