import { AuthLogin_Payload, LoginResult, UsersRegister_Payload } from "../server/dto/auth.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
}

export interface AuthService {
    registerUser(payload: UsersRegister_Payload): Promise<UsersResult>;

    loginUsers(payload: AuthLogin_Payload): Promise<LoginResult>;
}
