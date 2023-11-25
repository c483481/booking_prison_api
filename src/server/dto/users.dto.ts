import { BaseResult } from "../../module/dto.module";

export interface UsersResult extends BaseResult {
    username: string;
    tagRole: string;
    role: string | null;
}

export interface ChangePassword_Payload {
    password: string;
    userXid: string;
}
