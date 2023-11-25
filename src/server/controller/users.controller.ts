import { Request } from "express";
import { AppServiceMap, UsersService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { ChangePassword_Payload } from "../dto/users.dto";
import { getForceUsersSession } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

export class UsersController extends BaseController {
    private service!: UsersService;
    constructor() {
        super("users");
    }

    init(service: AppServiceMap): void {
        this.service = service.users;
    }

    initRoute(): void {
        this.router.post("/password", defaultMiddleware(), WrapAppHandler(this.postChangePassword));
    }

    postChangePassword = async (req: Request): Promise<unknown> => {
        const payload = req.body as ChangePassword_Payload;

        const usersSession = getForceUsersSession(req);

        payload.userXid = usersSession.xid;

        await this.service.changePassword(payload);

        return "success";
    };
}
