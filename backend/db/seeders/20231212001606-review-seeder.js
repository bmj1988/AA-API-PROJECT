'use strict';
const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviewSeeds = [
  {
    userId: 1,
    spotId: 3,
    review: 'This place was awesome! x512',
    stars: 4,
  },
  {
    userId: 3,
    spotId: 3,
    review: 'This place was ok! x445',
    stars: 3,
  },
  {
    userId: 2,
    spotId: 1,
    review: 'This place was the best! x555',
    stars: 5,
  },
  {
    userId: 3,
    spotId: 1,
    review: 'This place was a 2 x908',
    stars: 2,
  },
  {
    userId: 2,
    spotId: 2,
    review: 'This place was baddd! x142',
    stars: 1,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviewSeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: reviewSeeds.map((review) => (review.review))}
    })
  }
};
