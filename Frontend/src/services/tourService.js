const db = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

const getTourByType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Tour.findAll({
        attributes: [
          [
            db.sequelize.fn('count', db.sequelize.col('tour_type_id')),
            'countTour',
          ],
        ],
        group: ['Tour.tour_type_id'],
        include: [
          {
            model: db.TourType,
            as: 'tourType',
            attributes: ['name'],
          },
        ],
        raw: true,
        nest: true,
        order: db.sequelize.literal('countTour DESC'),
      });
      return resolve({
        status: 0,
        data: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getTourByCustomer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let myMoment = moment();
      let currentDay = myMoment.format('YYYY-MM-DD HH:mm:ss');
      let beforeThreeMonth = myMoment
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm:ss');
      let data = await db.Tour.findAll({
        attributes: [],
        group: ['Tour.tour_type_id'],
        include: [
          {
            model: db.TourType,
            as: 'tourType',
            attributes: ['name'],
          },
          {
            model: db.TourOrder,
            as: 'tourOrders',
            where: {
              order_date: {
                [Op.between]: [beforeThreeMonth, currentDay],
              },
            },
            attributes: [
              [
                db.sequelize.fn('sum', db.sequelize.col('total_member')),
                'countMember',
              ],
            ],
            group: ['TourOrder.tour_id'],
          },
        ],
        raw: true,
        nest: true,
      });
      return resolve({
        status: 0,
        data: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  getTourByType: getTourByType,
  getTourByCustomer: getTourByCustomer,
};
