const router = require('express').Router();
const stationController = require('../controllers/station');

router.post('/new', async(req, res) => {
    const result = await stationController.create(req.body);
    return res.json(result);
});

router.get('/all', async(req, res) => {
    const result = await stationController.get(req.query.page, req.query.limit, req.query.search);
    return res.json(result);
});

router.get('/mini', async(req, res) => {
    const result = await stationController.getMini();
    return res.json(result);
})

router.put('/:id', async(req, res) => {
    const result = await stationController.update(req.params.id, req.body);
    return res.json(result);
})

router.delete('/:id', async(req, res) => {
    const result = await stationController.delete(req.params.id);
    return res.json(result);
})

module.exports = router;