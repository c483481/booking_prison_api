import { baseValidator } from "./base.validator";

export class JadwalValidator {
    static JadwalChange_Payload = baseValidator.compile({
        name: "string|empty:false|required|min:1|max:255",
        hari: {
            type: "enum",
            values: ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"],
        },
        $$strict: true,
    });
}
