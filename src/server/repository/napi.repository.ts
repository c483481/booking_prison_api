import { NapiRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Napi, NapiAttributes, NapiCreationAttributes } from "../model/napi.model";
import { BaseRepository } from "./base.repository";
import { Order, WhereOptions } from "sequelize";

export class SequelizeNapiRepository extends BaseRepository implements NapiRepository {
    private napi!: typeof Napi;
    init(datasource: AppDataSource): void {
        this.napi = datasource.sqlModel.Napi;
    }

    insertNapi = async (payload: NapiCreationAttributes): Promise<NapiAttributes> => {
        return this.napi.create(payload);
    };

    findNapi = async (payload: List_Payload): Promise<FindResult<NapiAttributes>> => {
        // retrieve options
        const { filters, showAll } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        const where: WhereOptions<NapiAttributes> = {};

        if (filters.cellName) {
            where.cell = filters.cellName;
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.napi.findAndCountAll({
            where,
            offset,
            limit,
            order,
        });
    };

    findByXid = async (xid: string): Promise<NapiAttributes | null> => {
        return this.napi.findOne({
            where: {
                xid,
            },
        });
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
