"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;

const name = "napi";
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
            dateOut: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            cell: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            reason: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
