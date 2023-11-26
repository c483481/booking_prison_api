import { Order, WhereOptions } from "sequelize";
import { BookingRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Booking, BookingAttributes, BookingCreationAttributes } from "../model/booking.model";
import { BaseRepository } from "./base.repository";

export class SequelizeBookingRepository extends BaseRepository implements BookingRepository {
    private booking!: typeof Booking;

    init(datasource: AppDataSource): void {
        this.booking = datasource.sqlModel.Booking;
    }

    insertBooking = async (payload: BookingCreationAttributes): Promise<BookingAttributes> => {
        return this.booking.create(payload);
    };

    findByXid = async (xid: string): Promise<BookingAttributes | null> => {
        return this.booking.findOne({
            where: {
                xid,
            },
        });
    };

    findBooking = async (payload: List_Payload): Promise<FindResult<BookingAttributes>> => {
        // retrieve options
        const { filters, showAll, usersSession } = payload;

        // prepare find options
        let limit: number | undefined = undefined;
        let offset: number | undefined = undefined;

        if (!showAll) {
            limit = payload.limit;
            offset = payload.skip;
        }

        const where: WhereOptions<BookingAttributes> = {};

        if (filters.users) {
            where.userXid = usersSession.xid;
        }

        if (filters.notClear) {
            where.clear = false;
        }

        // parsing sort option
        const { order } = this.parseSortBy(payload.sortBy);

        return await this.booking.findAndCountAll({
            where,
            offset,
            limit,
            order,
        });
    };

    updateBooking = async (id: number, updateValue: Partial<BookingAttributes>, version: number): Promise<number> => {
        const result = await this.booking.update(updateValue, {
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
