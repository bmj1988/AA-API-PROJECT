'use strict';
const { Spot } = require('../models')
const spotSeed = [
  {
    address: '455 Pine Hollow Rd',
    description: 'A warm lakeside retreat in the snowy mountains.',
    ownerId: 1,
    city: 'Elk',
    state: 'WV',
    country: 'USA',
    lat: 39.29,
    lng: 76.60,
    name: 'Windswept Abode',
    price: 100.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/snowy_lakehouse_1.jpeg'
  },
  {
    address: '5600 Cosmopolitan Ave',
    description: 'An urban sanctuary in the heart of the city.',
    ownerId: 1,
    city: 'New York City',
    state: 'NY',
    country: 'USA',
    lat: 39.40,
    lng: 76.70,
    name: '5600 Cosmo',
    price: 110.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/striking_modern_1.jpeg'
  },
  {
    address: '123 Wave Blvd',
    description: 'A place to be waved!',
    ownerId: 2,
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    lat: 40.29,
    lng: 80.60,
    name: 'High Tide',
    price: 120.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/beach_house_epic_1.jpeg'
  },
  {
    address: '675 Lake Trail',
    description: 'A quiet retreat amongst the pines.',
    ownerId: 2,
    city: 'Saugatuk',
    state: 'MI',
    country: 'USA',
    lat: 41.29,
    lng: 64.60,
    name: 'The Lakehouse',
    price: 140.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/lake_house_exposed_1.jpeg'


  },
  {
    address: '8888 Slate Way',
    description: 'A modern retreat',
    ownerId: 2,
    city: 'Washington',
    state: 'DC',
    country: 'USA',
    lat: 42.29,
    lng: 56.60,
    name: 'Slate Estate',
    price: 300.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/metropolitan_rainy_2.jpeg'
  },
  {
    address: '1400 Palace Ct',
    description: 'A palace in Dallas',
    ownerId: 1,
    city: 'Dallas',
    state: 'TX',
    country: 'USA',
    lat: 55.29,
    lng: 32.60,
    name: 'Dallas Palace',
    price: 230.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/plush_modern_1.jpeg'
  },
  {
    address: '560 Moonsong Hollow Trail',
    description: 'A relaxing getaway',
    ownerId: 3,
    city: 'Detroit',
    state: 'MI',
    country: 'USA',
    lat: 20.29,
    lng: 32.60,
    name: 'Relax House',
    price: 100.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/warm_cabin_1.jpeg'
  },
  {
    address: '777 Party Boulevard',
    description: 'Party house!',
    ownerId: 1,
    city: 'Partytown',
    state: 'MD',
    country: 'USA',
    lat: 21.29,
    lng: 80.60,
    name: 'Party Hardy',
    price: 777.50,
    previewImage: 'https://bmj1988-api-pics.s3.amazonaws.com/apiPicsFolder/beach_stately_1.jpeg'
  }
]
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(spotSeed, { validate: true })
    } catch (err) {
      throw err
    }
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: spotSeed.map(seed => seed.name)}
    }, {});
  }
};
