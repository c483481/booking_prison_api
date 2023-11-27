import {
    AbsenRepository,
    AppRepositoryMap,
    BookingRepository,
    CellRepository,
    JadwalRepository,
    NapiRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { SequelizeAbsenRepository } from "./absen.reposittory,";
import { BaseRepository } from "./base.repository";
import { SequelizeBookingRepository } from "./booking.repository";
import { SequelizeCellRepository } from "./cell.repository";
import { MemoryJadwalRepository } from "./jadwal.repository";
import { SequelizeNapiRepository } from "./napi.repository";
import { SequelizeUsersRepository } from "./users.repository";

export class Repository implements AppRepositoryMap {
    readonly users: UsersRepository = new SequelizeUsersRepository();
    readonly booking: BookingRepository = new SequelizeBookingRepository();
    readonly cell: CellRepository = new SequelizeCellRepository();
    readonly napi: NapiRepository = new SequelizeNapiRepository();
    readonly absen: AbsenRepository = new SequelizeAbsenRepository();
    readonly jadwal: JadwalRepository = new MemoryJadwalRepository();

    init(datasource: AppDataSource) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseRepository) {
                r.init(datasource);
                console.log(`initiate repository ${k}`);
            }
        });
    }
}
