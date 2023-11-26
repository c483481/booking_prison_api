import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Optional, Model, DataTypes, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface CellAttributes extends BaseSequelizeAttribute {
    name: string;
    count: number;
    max: number;
}

export type CellCrationAttributes = Optional<CellAttributes, optionalSequelize>;

export class Cell extends Model<CellAttributes, CellCrationAttributes> implements CellAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    name!: string;
    count!: number;
    max!: number;

    static initModels(sequelize: Sequelize): typeof Cell {
        return Cell.init(
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
                count: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                max: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "cell",
                timestamps: false,
            }
        );
    }
}
