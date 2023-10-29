'use strict';
const { Spot } = require('../models')
const spotSeed = [
  {
    address: '123 Fake Street',
    description: 'A place to be fake!',
    ownerId: 1,
    city: 'Baltimore',
    state: 'MD',
    country: 'USA',
    lat: 39.29,
    lng: 76.60,
    name: 'Fake Manor',
    price: 100.50

  },
  {
    address: '456 Fake Street',
    description: 'A place to be faker!',
    ownerId: 1,
    city: 'Baltimore',
    state: 'MD',
    country: 'USA',
    lat: 39.40,
    lng: 76.70,
    name: 'Fakemore Manor',
    price: 110.50
  },
  {
    address: '123 Wave Street',
    description: 'A place to be waved!',
    ownerId: 2,
    city: 'Ocean City',
    state: 'MD',
    country: 'USA',
    lat: 40.29,
    lng: 80.60,
    name: 'Wave Manor',
    price: 120.50
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(spotSeed, { validate: true })
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {
      name: spotSeed.map(seed => seed.name)
    },
     {});
  }
};
