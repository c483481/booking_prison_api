import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Booking } from "./booking.model";
import { Cell } from "./cell.model";
import { Napi } from "./napi.model";
import { Absen } from "./absen.model";

export interface AppSqlModel {
    Users: typeof Users;
    Booking: typeof Booking;
    Cell: typeof Cell;
    Napi: typeof Napi;
    Absen: typeof Absen;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Booking.initModels(sequelize);
    Cell.initModels(sequelize);
    Napi.initModels(sequelize);
    Absen.initModels(sequelize);

    return {
        Users,
        Booking,
        Cell,
        Napi,
        Absen,
    };
}
