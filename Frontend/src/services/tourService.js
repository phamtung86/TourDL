const db = require('../models');
const moment = require('moment');
const { Op, where } = require('sequelize');

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

let getInfoTourDetail = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Tour.findOne({
        where: {
          id: inputId,
        },
        attributes: {
          exclude: [
            'transport_id',
            'tour_type_id',
            'destination',
            'destination_slug',
            'file_name',
          ],
        },
        include: [
          {
            model: db.TourCalendar,
            as: 'tourCalendars',
            attributes: ['id', 'start_date', 'slot'],
            include: [
              {
                model: db.Voucher,
                as: 'voucher',
                attributes: ['value', 'type'],
              },
            ],
          },
          {
            model: db.TourDetail,
            as: 'tourDetail',
            attributes: {
              exclude: ['id', 'file_name', 'url', 'tour_id'],
            },
          },
        ],
        raw: false,
        nest: false,
      });
      if (!data)
        return resolve({
          status: 1,
          message: 'Không tìm thấy',
        });
      return resolve({
        status: 0,
        message: 'OK',
        data: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getInfoTourDetailByDate = (tourId, dateId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Tour.findOne({
        where: {
          id: tourId,
        },
        attributes: {
          exclude: [
            'transport_id',
            'tour_type_id',
            'destination',
            'destination_slug',
            'file_name',
          ],
        },
        include: [
          {
            model: db.TourCalendar,
            as: 'tourCalendars',
            where: {
              id: dateId,
            },
            attributes: ['id', 'start_date', 'slot'],
            include: [
              {
                model: db.Voucher,
                as: 'voucher',
                attributes: ['value', 'type'],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data)
        return resolve({
          status: 1,
          message: 'Không tìm thấy',
        });
      return resolve({
        status: 0,
        message: 'OK',
        data: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let createTourOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('data: ', { data });

      await db.TourOrder.create(
        {
          total_price: data.totalPrice,
          note: data.note,
          order_date: data.orderDate,
          total_member: data.totalMember,
          tour_id: data.tourId,
          userTourOrder: data.userTourOrder,
          members: data.members,
        },
        {
          include: ['userTourOrder', 'members'],
        }
      );
      return resolve({
        status: 0,
        message: 'Thành công',
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTourByType: getTourByType,
  getTourByCustomer: getTourByCustomer,
  getInfoTourDetail: getInfoTourDetail,
  getInfoTourDetailByDate: getInfoTourDetailByDate,
  createTourOrder: createTourOrder,
};
