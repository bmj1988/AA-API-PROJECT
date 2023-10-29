'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Spots";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'previewImage', {
      type: Sequelize.STRING,
      defaultValue: null,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'previewImage')
  }
};
