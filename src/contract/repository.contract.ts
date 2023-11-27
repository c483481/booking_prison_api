import { FindResult, List_Payload } from "../module/dto.module";
import { JadwalAttribute, JadwalHariAttribute } from "../server/dto/jadwal.dto";
import { AbsenAttrribute, AbsenCreationAttribute } from "../server/model/absen.model";
import { BookingAttributes, BookingCreationAttributes } from "../server/model/booking.model";
import { CellAttributes, CellCrationAttributes } from "../server/model/cell.model";
import { NapiAttributes, NapiCreationAttributes } from "../server/model/napi.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    booking: BookingRepository;
    cell: CellRepository;
    napi: NapiRepository;
    absen: AbsenRepository;
    jadwal: JadwalRepository;
}

export interface UsersRepository {
    createUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByUsername(username: string): Promise<UsersAttributes | null>;

    updateUsers(id: number, updateValue: Partial<UsersAttributes>, version: number): Promise<number>;

    findByXid(xid: string): Promise<UsersAttributes | null>;
}

export interface BookingRepository {
    insertBooking(payload: BookingCreationAttributes): Promise<BookingAttributes>;

    findBooking(payload: List_Payload): Promise<FindResult<BookingAttributes>>;

    updateBooking(id: number, updateValue: Partial<BookingAttributes>, version: number): Promise<number>;

    findByXid(xid: string): Promise<BookingAttributes | null>;

    findAllBookingToday(): Promise<BookingAttributes[]>;

    updateBulkBooking(updateValue: Partial<BookingAttributes>): Promise<number>;
}

export interface CellRepository {
    insertCell(payload: CellCrationAttributes): Promise<CellAttributes>;

    findCell(payload: List_Payload): Promise<FindResult<CellAttributes>>;

    findCellByXid(xid: string): Promise<CellAttributes | null>;

    updateCell(id: number, updateValues: Partial<CellAttributes>, version: number): Promise<number>;
}

export interface NapiRepository {
    insertNapi(payload: NapiCreationAttributes): Promise<NapiAttributes>;

    findNapi(payload: List_Payload): Promise<FindResult<NapiAttributes>>;

    findByXid(xid: string): Promise<NapiAttributes | null>;
}

export interface AbsenRepository {
    insertAbsen(payload: AbsenCreationAttribute): Promise<AbsenAttrribute>;

    findAbsen(payload: List_Payload): Promise<FindResult<AbsenAttrribute>>;
}

export interface JadwalRepository {
    getJadwal(): JadwalAttribute;

    setJadwal(hari: JadwalHariAttribute, name: string): void;
}
