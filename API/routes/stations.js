const router = require('express').Router();
const jwt = require('../../config/jwt');
const stationController = require('../controller/stations');

router.get('/', async(req, res) => {
    const result = await stationController.getAll();
    let dataObj = {};
    if (result.status == 200) {
        dataObj = result.data
    } else {
        dataObj = {
            message: result.message,
            data: result.data
        }
    }
    return res.status(result.status).json(dataObj);
});

module.exports = router;