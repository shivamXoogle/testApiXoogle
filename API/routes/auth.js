const auth = require('../controller/auth');

const router = require('express').Router();

router.post('/register', async(req, res) => {
    const result = await auth.create(req.body);
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

router.post('/login', async(req, res) => {
    const result = await auth.login(req.body);
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