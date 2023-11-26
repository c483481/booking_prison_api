import { CellRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Cell, CellAttributes, CellCrationAttributes } from "../model/cell.model";
import { BaseRepository } from "./base.repository";
import { Order } from "sequelize";

export class SequelizeCellRepository extends BaseRepository implements CellRepository {
    private cell!: typeof Cell;
    init(datasource: AppDataSource): void {
        this.cell = datasource.sqlModel.Cell;
    }

    insertCell = async (payload: CellCrationAttributes): Promise<CellAttributes> => {
        return this.cell.create(payload);
    };

    findCell = async (payload: List_Payload): Promise<FindResult<CellAttributes>> => {
        // retrieve options
        const { showAll } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.cell.findAndCountAll({
            offset,
            limit,
            order,
        });
    };

    findCellByXid = async (xid: string): Promise<CellAttributes | null> => {
        return this.cell.findOne({
            where: {
                xid,
            },
        });
    };

    updateCell = async (id: number, updateValues: Partial<CellAttributes>, version: number): Promise<number> => {
        const result = await this.cell.update(updateValues, {
            where: {
                id,
                version,
            },
        });

        return result[0];
    };

    parseSortBy = (sortBy: string): { order: Order } => {
        // determine sorting option
        let order: Order;
        switch (sortBy) {
            case "createdAt-asc": {
                order = [["createdAt", "ASC"]];
                break;
            }
            case "createdAt-desc": {
                order = [["createdAt", "DESC"]];
                break;
            }
            case "updatedAt-asc": {
                order = [["updatedAt", "ASC"]];
                break;
            }
            case "updatedAt-desc": {
                order = [["updatedAt", "DESC"]];
                break;
            }
            default: {
                order = [["createdAt", "DESC"]];
                sortBy = "createdAt-desc";
            }
        }

        return { order };
    };
}
