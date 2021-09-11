const router = require('express').Router();
const saleController = require('../../Admin/controllers/sale');

router.get('/all', async(req, res) => {
    const result = await saleController.get(req.query.page, req.query.limit, req.query.date, req.query.station);
    return res.json(result);
});

router.get('/export', async(req, res) => {
    await saleController.export(req, res);
})

module.exports = router;