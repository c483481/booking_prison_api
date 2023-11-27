import { Request } from "express";
import { AbsenService, AppServiceMap } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { getForceUsersSession, getListOption } from "../../utils/helper.utils";
import { AbsenCreation_Payload } from "../dto/absen.dto";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";

export class AbsenController extends BaseController {
    private service!: AbsenService;
    constructor() {
        super("absen");
    }
    init(service: AppServiceMap): void {
        this.service = service.absen;
    }

    initRoute(): void {
        this.router.post("/:xid/:tema", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.postCreateAbsen));

        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getListAbsen));
    }

    postCreateAbsen = async (req: Request): Promise<unknown> => {
        const payload: AbsenCreation_Payload = {
            xid: req.params.xid,
            tema: req.params.tema,
            userSession: getForceUsersSession(req),
        };

        const result = await this.service.createAbsen(payload);

        return result;
    };

    getListAbsen = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.listAbsen(payload);

        return result;
    };
}
