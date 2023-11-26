import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Booking } from "./booking.model";
import { Cell } from "./cell.model";
import { Napi } from "./napi.model";

export interface AppSqlModel {
    Users: typeof Users;
    Booking: typeof Booking;
    Cell: typeof Cell;
    Napi: typeof Napi;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Booking.initModels(sequelize);
    Cell.initModels(sequelize);
    Napi.initModels(sequelize);

    return {
        Users,
        Booking,
        Cell,
        Napi,
    };
}
