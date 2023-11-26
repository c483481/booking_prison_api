import { AppRepositoryMap, BookingRepository } from "../../contract/repository.contract";
import { BookingService } from "../../contract/service.contract";
import { errorResponses } from "../../response";
import { toUnixEpoch } from "../../utils/date.utils";
import { composeResult, createData } from "../../utils/helper.utils";
import { BookingCreation_Payload, BookingResult } from "../dto/booking.dto";
import { BookingAttributes, BookingCreationAttributes } from "../model/booking.model";
import { BaseService } from "./base.service";

export class Booking extends BaseService implements BookingService {
    private bookingRepo!: BookingRepository;
    init(repository: AppRepositoryMap): void {
        this.bookingRepo = repository.booking;
    }

    createBooking = async (payload: BookingCreation_Payload): Promise<BookingResult> => {
        const { name, noKtp, noTelp, sesi, barang, date, alamat, userSession } = payload;

        if (isNaN(Number(noKtp)) || isNaN(Number(noTelp))) {
            throw errorResponses.getError("E_REQ_1");
        }

        const createdValues = createData<BookingCreationAttributes>(
            {
                name,
                noKtp,
                bookingDate: date,
                sesi,
                barang,
                alamat,
                noTelp,
                clear: false,
                userXid: userSession.xid,
            },
            userSession
        );

        const result = await this.bookingRepo.insertBooking(createdValues);

        return composeBooking(result);
    };
}

export function composeBooking(row: BookingAttributes): BookingResult {
    return composeResult(row, {
        name: row.name,
        alamat: row.alamat,
        noKtp: row.noKtp,
        noTelp: row.noKtp,
        clear: row.clear,
        sesi: row.sesi,
        barang: row.barang,
        date: toUnixEpoch(row.bookingDate),
    });
}
