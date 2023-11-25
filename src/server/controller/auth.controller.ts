import { Request } from "express";
import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { AuthLogin_Payload, UsersRegister_Payload } from "../dto/auth.dto";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { AuthValidator } from "../validate/auth.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { Privilege } from "../../constant/privilege.constant";

export class AuthController extends BaseController {
    private service!: AuthService;

    constructor() {
        super("auth");
    }

    init(service: AppServiceMap): void {
        this.service = service.auth;
    }

    initRoute(): void {
        this.router.post("/users", WrapAppHandler(this.postCreateUsers));

        this.router.post("/penjaga", defaultMiddleware(Privilege.penjaga), WrapAppHandler(this.postCreatePenjaga));

        this.router.post("/login", WrapAppHandler(this.postLogin));
    }

    postCreateUsers = async (req: Request): Promise<unknown> => {
        const payload = req.body as UsersRegister_Payload;

        validate(AuthValidator.RegisterUsers_Payload, payload);

        const result = await this.service.registerUser(payload);

        return result;
    };

    postLogin = async (req: Request): Promise<unknown> => {
        const payload = req.body as AuthLogin_Payload;

        validate(AuthValidator.AuthLogin_Payload, payload);

        const result = await this.service.loginUsers(payload);

        return result;
    };

    postCreatePenjaga = async (req: Request): Promise<unknown> => {
        const payload = req.body as UsersRegister_Payload;

        validate(AuthValidator.RegisterUsers_Payload, payload);

        const result = await this.service.registerPenjaga(payload);

        return result;
    };
}
