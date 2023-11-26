import { isValid } from "ulidx";
import { AppRepositoryMap, BookingRepository } from "../../contract/repository.contract";
import { BookingService } from "../../contract/service.contract";
import { GetDetail_Payload, ListResult, List_Payload } from "../../module/dto.module";
import { errorResponses } from "../../response";
import { toUnixEpoch } from "../../utils/date.utils";
import { compose, composeResult, createData, updateData } from "../../utils/helper.utils";
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

    updateStatusBooking = async (payload: GetDetail_Payload): Promise<void> => {
        const { xid, usersSession } = payload;

        if (!isValid(xid)) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const booking = await this.bookingRepo.findByXid(xid);

        if (!booking) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const updateValue = updateData<BookingAttributes>(
            booking,
            {
                clear: true,
            },
            usersSession
        );

        const result = await this.bookingRepo.updateBooking(booking.id, updateValue, booking.version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }
    };

    listBooking = async (payload: List_Payload): Promise<ListResult<BookingResult>> => {
        const result = await this.bookingRepo.findBooking(payload);

        const items = compose(result.rows, composeBooking);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeBooking(row: BookingAttributes): BookingResult {
    return composeResult(row, {
        name: row.name,
        alamat: row.alamat,
        noKtp: row.noKtp,
        noTelp: row.noTelp,
        clear: row.clear,
        sesi: row.sesi,
        barang: row.barang,
        date: toUnixEpoch(row.bookingDate),
    });
}
