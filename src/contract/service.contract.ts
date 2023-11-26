import { ListResult, List_Payload } from "../module/dto.module";
import { AuthLogin_Payload, LoginResult, UsersRegister_Payload } from "../server/dto/auth.dto";
import { BookingCreation_Payload, BookingResult } from "../server/dto/booking.dto";
import { ChangePassword_Payload, UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    users: UsersService;
    booking: BookingService;
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
}
