import { baseValidator } from "./base.validator";

export class BookingValidate {
    static BookingCreation_Payload = baseValidator.compile({
        name: "string|empty:false|required|min:5|max:255",
        noTelp: {
            type: "string",
            empty: false,
            require: true,
            min: 11,
            max: 14,
        },
        noKtp: {
            type: "string",
            empty: false,
            require: true,
            min: 16,
            max: 16,
        },
        barang: "string|empty:false|required|min:1|max:255",
        alamat: "string|empty:false|required|min:3|max:255",
        sesi: {
            type: "enum",
            values: ["sesi 1", "sesi 2"],
        },
        date: {
            type: "custom",
            require: true,
            convert: true,
        },
        $$strict: true,
    });
}
