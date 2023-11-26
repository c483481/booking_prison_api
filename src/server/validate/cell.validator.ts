import { baseValidator } from "./base.validator";

export class CellValidator {
    static CellCreation_Payload = baseValidator.compile({
        name: "string|empty:false|required|min:1|max:255",
        max: "number|empty:false|required|min:2|max:255",
        $$strict: true,
    });
}
