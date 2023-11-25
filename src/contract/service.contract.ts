import { UsersRegister_Paayload } from "../server/dto/auth.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
}

export interface AuthService {
    registerUser(payload: UsersRegister_Paayload): Promise<UsersResult>;
}
