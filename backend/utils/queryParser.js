const Sequelize = require('sequelize')
const {sequelize} = require('../db/models')
let commandPath = 'Reviews'
let spotsPath = 'spotId'
if (process.env.NODE_ENV === 'production') {
    commandPath = '"aa_api_project_schema"."Reviews"'
    spotsPath = '"spotId"'
}

const queryParser = async function (req, res, next) {
    const errors = {}

    let size = req.query.size ? parseInt(req.query.size) : 20
    let page = req.query.page ? parseInt(req.query.page) : 1
    req.querySize = size > 20 ? 20 : size
    req.queryPage = page > 10 ? 1 : page
    req.minLat = req.query.minLat ? req.query.minLat : -90;
    req.maxLat = req.query.maxLat ? req.query.maxLat : 90;
    req.minLng = req.query.minLng ? req.query.minLng : -180;
    req.maxLng = req.query.maxLng ? req.query.maxLng : 180;
    req.maxPrice = req.query.maxPrice ? req.query.maxPrice : 100000;
    req.minPrice = req.query.minPrice  ? req.query.minPrice : 0;
    if (req.minLat < -90 || req.minLat > 90) Object.assign(errors, {minLat: 'Minimum latitude is invalid'});
    if (req.maxLat > 90 || req.maxLat < -90) Object.assign(errors, {maxLat: 'Maximum latitude is invalid'});
    if (req.minLng < -180 || req.minLng > 180) Object.assign(errors, {minLng: 'Minimum longitude is invalid'});
    if (req.maxLng > 180 || req.maxLng < -180) Object.assign(errors, {maxLng: 'Maximum longitude is invalid'});
    if (req.minPrice < 0) Object.assign(errors, {minPrice: "Minimum price must be greater than or equal to 0"});
    if (req.maxPrice < 0) Object.assign(errors, {maxPrice: "Maximum price must be greater than or equal to 0"});
    if (req.querySize < 1 ) Object.assign(errors, {size: 'Size must be greater than or equal to 1'});
    if (req.queryPage < 1 ) Object.assign(errors, {page: 'Page must be greater than or equal to 1'});
    if (Object.keys(errors).length > 0) return res.status(400).json({message: 'Bad Request', errors: errors})
    return next()
}

const avgRater = async function (spotId) {
    let avgRating = await sequelize.query(`SELECT ROUND(AVG(stars), 2) from ${commandPath} WHERE ${spotsPath} = ${spotId}`)
        avgRating = Object.values(avgRating[0][0])
        return avgRating[0]
}
const numReviews = async function (spotId) {
    let count = await sequelize.query(`SELECT COUNT(*) from ${commandPath} WHERE ${spotsPath} = ${spotId}`)
    count = Object.values(count[0][0])
    return count[0]
}

module.exports = { queryParser, avgRater, numReviews }
