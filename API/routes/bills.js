const router = require('express').Router();
const billController = require('../controller/bills');

router.post('/', async(req, res) => {
    const result = await billController.create(req.body);
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

router.get('/', async(req, res) => {
    const result = await billController.get(req.query.page, req.query.limit);
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

router.get('/:id', async(req, res) => {
    const result = await billController.get({ _id: req.params.id });
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