import { Router } from "express";
import { AppServiceMap } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { limiter } from "../../handler/limitter.handler";
import { AuthController } from "./auth.controller";
import { UsersController } from "./users.controller";

export class Controller {
    private readonly auth: AuthController = new AuthController();
    private readonly users: UsersController = new UsersController();

    init(service: AppServiceMap): Router {
        const router = Router();
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseController) {
                r.init(service);
                r.initRoute();
                const prefix = `/${r.getPrefix()}`;

                if (r.getUseLimiter()) {
                    router.use(prefix, limiter);
                    console.log(`initiate limiter in ${prefix}`);
                }

                router.use(prefix, r.getRouter());

                console.log(`initiate ${k} route`);
            }
        });

        return router;
    }
}
