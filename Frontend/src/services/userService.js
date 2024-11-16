const db = require('../models');
const userTourOderModel = require('../models/userTourOderModel');

/** 
 * include: [
          {
            model: db.Library,
            as: 'library',
            attributes: {
              exclude: ['id', 'productId', 'createdAt', 'updatedAt'],
            },
          },
        ],
 * 
 * 
*/

let getTopUser = (option) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.UserTourOrder.findAll({
        include: [
          {
            model: db.TourOrder,
            as: 'tourOrder',
            attributes: ['total_price'],
          },
        ],
      });
      return resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopUser: getTopUser,
};
