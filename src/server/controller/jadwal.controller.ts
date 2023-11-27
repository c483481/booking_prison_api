import { Request } from "express";
import { AppServiceMap, JadwalService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { JadwalChange_Payload } from "../dto/jadwal.dto";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { JadwalValidator } from "../validate/jadwal.validator";

export class JadwalController extends BaseController {
    private service!: JadwalService;
    constructor() {
        super("jadwal");
    }
    init(service: AppServiceMap): void {
        this.service = service.jadwal;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getJadwal));

        this.router.post("/", defaultMiddleware(), WrapAppHandler(this.setJadwal));
    }

    getJadwal = (_req: Request): unknown => {
        return this.service.getJadwal();
    };

    setJadwal = (req: Request): unknown => {
        const payload = req.body as JadwalChange_Payload;

        validate(JadwalValidator.JadwalChange_Payload, payload);

        this.service.setJadwal(payload);

        return this.service.getJadwal();
    };
}
