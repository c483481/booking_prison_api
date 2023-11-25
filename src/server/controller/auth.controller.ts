import { Request } from "express";
import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { UsersRegister_Paayload } from "../dto/auth.dto";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { AuthValidator } from "../validate/auth.validator";

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
    }

    postCreateUsers = async (req: Request): Promise<unknown> => {
        const payload = req.body as UsersRegister_Paayload;

        validate(AuthValidator.RegisterUsers_Payload, payload);

        const result = await this.service.registerUser(payload);

        return result;
    };
}
