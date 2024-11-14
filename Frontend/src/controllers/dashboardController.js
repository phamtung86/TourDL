const axios = require('../utils/axios.js') 
let handGetRevenue = async (req,res,) => {
    const revenue = await axios.get(`http://localhost:8080/api/v1/Revenue/MONTH`)
    return res.status(200).json(data)
    json
    // router.get('/Dashboard', async (req, res) => {
  //   return res.render("admin/index.ejs", {revenu})
  // })
    
}
module.exports = {getDashBoard: handGetRevenue}
