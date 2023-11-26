import { AppRepositoryMap } from "../../contract/repository.contract";
import {
    AppServiceMap,
    AuthService,
    BookingService,
    CellService,
    NapiService,
    UsersService,
} from "../../contract/service.contract";
import { Auth } from "./auth.service";
import { BaseService } from "./base.service";
import { Booking } from "./booking.service";
import { Cell } from "./cell.service";
import { Napi } from "./napi.service";
import { Users } from "./users.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();
    readonly users: UsersService = new Users();
    readonly booking: BookingService = new Booking();
    readonly cell: CellService = new Cell();
    readonly napi: NapiService = new Napi();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
