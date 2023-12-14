'use strict';
let options = {};
options.tableName = "Spots";

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


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
