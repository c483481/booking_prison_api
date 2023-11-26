import { Request } from "express";
import { AppServiceMap, CellService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { CellCreation_Payload } from "../dto/cell.dto";
import { validate } from "../validate";
import { CellValidator } from "../validate/cell.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";
import { WrapAppHandler } from "../../handler/default.handler";
import { getListOption } from "../../utils/helper.utils";

export class CellController extends BaseController {
    private service!: CellService;
    constructor() {
        super("cell");
    }
    init(service: AppServiceMap): void {
        this.service = service.cell;
    }
    initRoute(): void {
        this.router.post("/", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.postCreateCell));

        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getListCell));
    }

    postCreateCell = async (req: Request): Promise<unknown> => {
        const payload = req.body as CellCreation_Payload;

        validate(CellValidator.CellCreation_Payload, payload);

        const result = await this.service.createCell(payload);

        return result;
    };

    getListCell = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.getListCell(payload);

        return result;
    };
}
