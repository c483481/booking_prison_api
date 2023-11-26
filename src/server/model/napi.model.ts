import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface NapiAttributes extends BaseSequelizeAttribute {
    name: string;
    dateOut: Date;
    cell: string;
    reason: string;
}

export type NapiCreationAttributes = Optional<NapiAttributes, optionalSequelize>;

export class Napi extends Model<NapiAttributes, NapiCreationAttributes> implements NapiAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    name!: string;
    dateOut!: Date;
    cell!: string;
    reason!: string;

    static initModels(sequelize: Sequelize): typeof Napi {
        return Napi.init(
            {
                id,
                version,
                createdAt,
                updatedAt,
                xid,
                modifiedBy,
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                dateOut: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                cell: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                reason: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "napi",
                timestamps: false,
            }
        );
    }
}
