import { baseValidator } from "./base.validator";

export class AuthValidator {
    static RegisterUsers_Payload = baseValidator.compile({
        username: "string|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        $$strict: true,
    });

    static AuthLogin_Payload = baseValidator.compile({
        username: "string|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        $$strict: true,
    });
}
