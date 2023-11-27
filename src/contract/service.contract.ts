import { GetDetail_Payload, ListResult, List_Payload, UserSession } from "../module/dto.module";
import { AbsenCreation_Payload, AbsenResult } from "../server/dto/absen.dto";
import { AuthLogin_Payload, LoginResult, UsersRegister_Payload } from "../server/dto/auth.dto";
import { BookingCreation_Payload, BookingResult } from "../server/dto/booking.dto";
import { CellCreation_Payload, CellResult } from "../server/dto/cell.dto";
import { NapiCreation_Payload, NapiResult } from "../server/dto/napi.dto";
import { ChangePassword_Payload, UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    users: UsersService;
    booking: BookingService;
    cell: CellService;
    napi: NapiService;
    absen: AbsenService;
}

export interface AuthService {
    registerUser(payload: UsersRegister_Payload): Promise<UsersResult>;

    registerPenjaga(payload: UsersRegister_Payload): Promise<UsersResult>;

    loginUsers(payload: AuthLogin_Payload): Promise<LoginResult>;
}

export interface UsersService {
    changePassword(payload: ChangePassword_Payload): Promise<void>;
}

export interface BookingService {
    createBooking(payload: BookingCreation_Payload): Promise<BookingResult>;

    listBooking(payload: List_Payload): Promise<ListResult<BookingResult>>;

    updateStatusBooking(payload: GetDetail_Payload): Promise<void>;

    updateBookingToday(userSession: UserSession): Promise<void>;
}

export interface CellService {
    createCell(payload: CellCreation_Payload): Promise<CellResult>;

    getListCell(payload: List_Payload): Promise<ListResult<CellResult>>;
}

export interface NapiService {
    createNapi(payload: NapiCreation_Payload): Promise<NapiResult>;

    listNapi(payload: List_Payload): Promise<ListResult<NapiResult>>;
}

export interface AbsenService {
    createAbsen(payload: AbsenCreation_Payload): Promise<AbsenResult>;
}
