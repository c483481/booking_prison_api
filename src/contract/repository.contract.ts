import { BookingAttributes, BookingCreationAttributes } from "../server/model/booking.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    booking: BookingRepository;
}

export interface UsersRepository {
    createUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByUsername(username: string): Promise<UsersAttributes | null>;

    updateUsers(id: number, updateValue: Partial<UsersAttributes>, version: number): Promise<number>;

    findByXid(xid: string): Promise<UsersAttributes | null>;
}

export interface BookingRepository {
    insertBooking(payload: BookingCreationAttributes): Promise<BookingAttributes>;
}
