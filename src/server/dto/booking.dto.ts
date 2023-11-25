import { BaseResult, UserSession } from "../../module/dto.module";

export interface BookingCreation_Payload {
    name: string;
    noKtp: string;
    noTelp: string;
    alamat: string;
    barang: string;
    date: Date;
    sesi: string;
    userSession: UserSession;
}

export interface BookingResult extends BaseResult {
    name: string;
    noKtp: string;
    noTelp: string;
    alamat: string;
    barang: string;
    date: number;
    sesi: string;
    clear: boolean;
}
