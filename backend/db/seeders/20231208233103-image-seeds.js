'use strict';

const { Image } = require('../models')

const imgSeeds = [
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/chalet_interior_1.jpeg',
    preview: false
  },
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/chalet_2.jpeg',
    preview: false
  },
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/chalet_4.jpeg',
    preview: false
  },
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/another_chalet.jpeg',
    preview: false
  },
  {
    imageableId: 1,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/nature_balcony_1.jpeg',
    preview: false
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/modern_view_1.jpeg',
    preview: false
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/pod_chairs.jpeg',
    preview: false
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/modern_interior_couch.jpeg',
    preview: false
  },
  {
    imageableId: 2,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/modern_interior_dining.jpeg',
    preview: false
  },
  {
    imageableId: 3,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/beach_pool_balcony.jpeg',
    preview: false
  },
  {
    imageableId: 3,
    imageableType: 'Spot',
    url: 'https://bmj1988-api-pics.s3.amazonaws.com/InteriorPhotos/beach_balcony_blue.jpeg',
    preview: false
  }
]

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate(imgSeeds, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: imgSeeds.map((image) => (image.url)) }
    }, {});
  }
};
