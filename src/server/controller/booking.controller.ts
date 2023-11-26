import { Request } from "express";
import { AppServiceMap, BookingService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { BookingCreation_Payload } from "../dto/booking.dto";
import { validate } from "../validate";
import { BookingValidate } from "../validate/booking.validatte";
import { getDetailOption, getForceUsersSession, getListOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";
import { Privilege } from "../../constant/privilege.constant";

export class BookingController extends BaseController {
    private service!: BookingService;
    constructor() {
        super("booking");
    }

    init(service: AppServiceMap): void {
        this.service = service.booking;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(), WrapAppHandler(this.postCreateBooking));

        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getListBooking));

        this.router.patch("/:xid", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.patchUpdateStatus));

        this.router.put("/today/all", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.updateBookingToday));
    }

    postCreateBooking = async (req: Request): Promise<unknown> => {
        const payload = req.body as BookingCreation_Payload;

        validate(BookingValidate.BookingCreation_Payload, payload);

        const userSession = getForceUsersSession(req);

        payload.userSession = userSession;

        const result = await this.service.createBooking(payload);

        return result;
    };

    getListBooking = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.listBooking(payload);

        return result;
    };

    patchUpdateStatus = async (req: Request): Promise<unknown> => {
        const payload = getDetailOption(req);

        await this.service.updateStatusBooking(payload);

        return "success";
    };

    updateBookingToday = async (req: Request): Promise<unknown> => {
        const userSession = getForceUsersSession(req);

        await this.service.updateBookingToday(userSession);

        return "success";
    };
}
