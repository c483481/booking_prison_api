import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { CommonColumn } from "../../module/default.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { ModifiedBy } from "../../module/dto.module";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;
export interface AbsenAttrribute extends BaseSequelizeAttribute {
    name: string;
    cell: string;
    napiXid: string;
    tema: string;
}

export type AbsenCreationAttribute = Optional<AbsenAttrribute, optionalSequelize>;

export class Absen extends Model<AbsenAttrribute, AbsenCreationAttribute> implements AbsenAttrribute {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    name!: string;
    cell!: string;
    napiXid!: string;
    tema!: string;

    static initModels(sequelize: Sequelize): typeof Absen {
        return Absen.init(
            {
                id,
                version,
                createdAt,
                updatedAt,
                xid,
                modifiedBy,
                napiXid: {
                    type: DataTypes.STRING(26),
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                cell: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                tema: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "absen",
                timestamps: false,
            }
        );
    }
}
