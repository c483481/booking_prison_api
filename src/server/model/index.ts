import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Booking } from "./booking.model";

export interface AppSqlModel {
    Users: typeof Users;
    Booking: typeof Booking;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Booking.initModels(sequelize);

    return {
        Users,
        Booking,
    };
}
