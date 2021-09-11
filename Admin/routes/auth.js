const auth = require('../controllers/auth');

const router = require('express').Router();

router.post('/login', async(req, res) => {
    const result = await auth.login(req.body);
    return res.json(result);
});


module.exports = router;