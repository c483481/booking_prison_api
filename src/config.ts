import dotenv from "dotenv";
import { parseToNumber, parseToString } from "./utils/parse.uttils";
import { compareString } from "./utils/compare.utils";
dotenv.config();

export interface AppConfiguration {
    isProduction: boolean;

    baseUrl: string;

    jwtKey: string;

    port: number;
    cors: string[];

    dbUser: string;
    dbPass: string;
    dbName: string;
    dbPort: number;
    dbHost: string;
    dbDialect: string;

    jwtLifeTime: number;

    limitRequestPerSecond: number;
}

function initConfig(): AppConfiguration {
    return {
        isProduction: compareString(parseToString(process.env.NODE_ENV), "production"),

        jwtKey: parseToString(process.env.JWT_KEY),
        baseUrl: parseToString(process.env.BASE_URL),

        port: parseToNumber(process.env.PORT, 3000),
        cors: parseToString(process.env.CORS).split(","),

        dbHost: parseToString(process.env.DB_HOST),
        dbName: parseToString(process.env.DB_NAME),
        dbUser: parseToString(process.env.DB_USER),
        dbPass: parseToString(process.env.DB_PASS),
        dbDialect: parseToString(process.env.DB_DIALECT, "mysql"),
        dbPort: parseToNumber(process.env.DB_PORT, 3306),

        jwtLifeTime: parseToNumber(process.env.LIFE_TIME_TOKEN),

        limitRequestPerSecond: parseToNumber(process.env.LIMIT_REQUEST_PER_SECOND, 5),
    };
}

export const config = initConfig();
