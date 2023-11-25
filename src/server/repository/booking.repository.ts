import { BookingRepository } from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
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
}
