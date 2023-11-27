import { DateTime } from "luxon";
import { AbsenRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Absen, AbsenAttrribute, AbsenCreationAttribute } from "../model/absen.model";
import { BaseRepository } from "./base.repository";
import { Op, Order, WhereOptions } from "sequelize";

export class SequelizeAbsenRepository extends BaseRepository implements AbsenRepository {
    private absen!: typeof Absen;
    init(datasource: AppDataSource): void {
        this.absen = datasource.sqlModel.Absen;
    }

    insertAbsen = async (payload: AbsenCreationAttribute): Promise<AbsenAttrribute> => {
        return this.absen.create(payload);
    };

    findAbsen = async (payload: List_Payload): Promise<FindResult<AbsenAttrribute>> => {
        // retrieve options
        const { filters, showAll } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        const where: WhereOptions<AbsenAttrribute> = {};

        if (filters.tema) {
            where.tema = filters.tema;
        }

        if (filters.today) {
            const now = DateTime.local().plus({ day: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            const previous = now.minus({ day: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            where.createdAt = {
                [Op.lte]: now.toJSDate().toISOString(),
                [Op.gte]: previous.toJSDate().toISOString(),
            };
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.absen.findAndCountAll({
            where,
            offset,
            limit,
            order,
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
