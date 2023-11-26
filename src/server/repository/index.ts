import {
    AppRepositoryMap,
    BookingRepository,
    CellRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { BaseRepository } from "./base.repository";
import { SequelizeBookingRepository } from "./booking.repository";
import { SequelizeCellRepository } from "./cell.repository";
import { SequelizeUsersRepository } from "./users.repository";

export class Repository implements AppRepositoryMap {
    readonly users: UsersRepository = new SequelizeUsersRepository();
    readonly booking: BookingRepository = new SequelizeBookingRepository();
    readonly cell: CellRepository = new SequelizeCellRepository();

    init(datasource: AppDataSource) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseRepository) {
                r.init(datasource);
                console.log(`initiate repository ${k}`);
            }
        });
    }
}
