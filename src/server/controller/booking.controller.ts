import { Request } from "express";
import { AppServiceMap, BookingService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { BookingCreation_Payload } from "../dto/booking.dto";
import { validate } from "../validate";
import { BookingValidate } from "../validate/booking.validatte";
import { getForceUsersSession } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

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
    }

    postCreateBooking = async (req: Request): Promise<unknown> => {
        const payload = req.body as BookingCreation_Payload;

        validate(BookingValidate.BookingCreation_Payload, payload);

        const userSession = getForceUsersSession(req);

        payload.userSession = userSession;

        const result = await this.service.createBooking(payload);

        return result;
    };
}
