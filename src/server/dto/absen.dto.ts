import { BaseResult, UserSession } from "../../module/dto.module";

export interface AbsenCreation_Payload {
    xid: string;
    tema: string;
    userSession: UserSession;
}

export interface AbsenResult extends BaseResult {
    name: string;
    napiXid: string;
    tema: string;
    cell: string;
}
