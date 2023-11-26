import { BaseResult, UserSession } from "../../module/dto.module";

export interface NapiCreation_Payload {
    name: string;
    longTime: number;
    reason: string;
    cellXid: string;
    userSession: UserSession;
}

export interface NapiResult extends BaseResult {
    name: string;
    dateOut: number;
    reason: string;
    cell: string;
}
