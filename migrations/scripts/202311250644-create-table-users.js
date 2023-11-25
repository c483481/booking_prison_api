"use strict";

const { CommonColumn } = require("../columns");
const { Constants } = require("../constants");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;
const { DEFAULT_JSON, DEFAULT_VERSION, DEFAULT_TIMESTAMP } = Constants;

const name = "users";
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
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING(5),
                allowNull: false,
            },
        });

        await queryInterface.bulkInsert(name, [
            {
                xid: "01HDHF760V9SZMEWK15TSJ08WX",
                modifiedBy: DEFAULT_JSON,
                version: DEFAULT_VERSION,
                createdAt: DEFAULT_TIMESTAMP,
                updatedAt: DEFAULT_TIMESTAMP,
                username: "admin",
                password: "$2a$10$umFnkaVz3NnsVrMBC2IP5eJUVN5Bu4vg89ss/5cGPxmgkS8C94ZAK",
                role: "ADM",
            },
        ]);
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
