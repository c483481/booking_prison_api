import { Request } from "express";
import { AppServiceMap, NapiService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { NapiCreation_Payload } from "../dto/napi.dto";
import { validate } from "../validate";
import { NapiValidator } from "../validate/napi.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";

export class NapiController extends BaseController {
    private service!: NapiService;

    constructor() {
        super("napi");
    }

    init(service: AppServiceMap): void {
        this.service = service.napi;
    }

    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.postCreateNapi));
    }

    postCreateNapi = async (req: Request): Promise<unknown> => {
        const payload = req.body as NapiCreation_Payload;

        validate(NapiValidator.NapiCreation_Payload, payload);

        const result = await this.service.createNapi(payload);

        return result;
    };
}
