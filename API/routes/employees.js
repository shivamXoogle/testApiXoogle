const router = require('express').Router();
const employeeController = require('../controller/employees');
const ERROR = require('../../config/ERROR');

router.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'EMPLOYEE_API'
    });
});

router.put('/registerFinger/:employeeId', async(req, res) => {
    const result = await employeeController.update(req.params, req.body);
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