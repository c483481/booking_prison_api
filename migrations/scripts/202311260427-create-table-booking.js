"use strict";

const { CommonColumn } = require("../columns");
const { Constants } = require("../constants");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;

const name = "booking";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(name, {
            id,
            version,
            createdAt,
            updatedAt,
            xid,
            modifiedBy,
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            alamat: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            noKtp: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },
            noTelp: {
                type: Sequelize.STRING(14),
                allowNull: false,
            },
            barang: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            sesi: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            bookingDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            clear: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            userXid: {
                type: Sequelize.STRING(26),
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
