import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface BookingAttributes extends BaseSequelizeAttribute {
    name: string;
    alamat: string;
    noKtp: string;
    noTelp: string;
    barang: string;
    sesi: string;
    bookingDate: Date;
    clear: boolean;
}

export type BookingCreationAttributes = Optional<BookingAttributes, optionalSequelize>;

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
    xid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    modifiedBy!: ModifiedBy;
    version!: number;
    id!: number;

    name!: string;
    alamat!: string;
    noKtp!: string;
    noTelp!: string;
    barang!: string;
    sesi!: string;
    bookingDate!: Date;
    clear!: boolean;

    static initModels(sequelize: Sequelize): typeof Booking {
        return Booking.init(
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
                alamat: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                noKtp: {
                    type: DataTypes.STRING(16),
                    allowNull: false,
                },
                noTelp: {
                    type: DataTypes.STRING(14),
                    allowNull: false,
                },
                barang: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                sesi: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                },
                bookingDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                clear: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "booking",
                timestamps: false,
            }
        );
    }
}
