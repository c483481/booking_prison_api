import { DataTypes } from "sequelize";
import { UserSession } from "./dto.module";

export const DEFAULT_USER_SESSION_ANONYMUS: UserSession = {
    xid: "ANONYMUS",
    username: "anonymus",
};

const id = {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
};

const version = {
    type: DataTypes.INTEGER,
    allowNull: false,
};

const createdAt = {
    type: DataTypes.DATE,
    allowNull: false,
};

const updatedAt = {
    type: DataTypes.DATE,
    allowNull: false,
};

const modifiedBy = {
    type: DataTypes.JSON,
    allowNull: false,
};

const xid = {
    type: DataTypes.STRING(26),
    allowNull: false,
    unique: true,
};

export const CommonColumn = {
    id,
    version,
    createdAt,
    updatedAt,
    modifiedBy,
    xid,
};
