import { baseValidator } from "./base.validator";

export class NapiValidator {
    static NapiCreation_Payload = baseValidator.compile({
        name: "string|empty:false|required|min:1|max:255",
        longTime: "number|empty:false|required|min:1|max:255",
        cellXid: "string|empty:false|required|min:26|max:26",
        reason: "string|empty:false|required|min:1|max:255",
        $$strict: true,
    });
}
