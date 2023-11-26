import { FindResult, List_Payload } from "../module/dto.module";
import { BookingAttributes, BookingCreationAttributes } from "../server/model/booking.model";
import { CellAttributes, CellCrationAttributes } from "../server/model/cell.model";
import { NapiAttributes, NapiCreationAttributes } from "../server/model/napi.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    booking: BookingRepository;
    cell: CellRepository;
    napi: NapiRepository;
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
}

export interface NapiRepository {
    insertNapi(payload: NapiCreationAttributes): Promise<NapiAttributes>;
}
