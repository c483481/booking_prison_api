import { Token } from "../../module/dto.module";
import { UsersResult } from "./users.dto";

export interface UsersRegister_Payload {
    username: string;
    password: string;
}

export interface AuthLogin_Payload {
    username: string;
    password: string;
}

export interface LoginResult extends UsersResult {
    key: {
        accessToken: Token;
        refreshToken: Token;
    };
}
