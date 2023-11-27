"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;

const name = "absen";
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
            napiXid: {
                type: Sequelize.STRING(26),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cell: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            tema: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
