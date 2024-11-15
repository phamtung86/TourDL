const axios = require('../utils/axios.js') 
let handGetRevenue = async (req,res) => {
    const revenue = await axios.get(`http://localhost:8080/api/v1/Revenue/MONTH`)
    const topTour = await axios.get(`http://localhost:8080/api/v1/TopTour?type=MONTH`);
    let data = {revenue : revenue,
                topTour : topTour}
    return res.render("admin/index.ejs", {data : data})   
}
module.exports = {getDashBoard: handGetRevenue}
