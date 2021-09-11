const router = require('express').Router();

router.get('/', async(req, res) => {
    let dataObj = {
        "text":"test"
    };
    return res.status(200).json(dataObj);
});

module.exports = router;