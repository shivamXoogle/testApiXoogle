const router = require('express').Router();

router.get('/', async(req, res) => {
    let dataObj = {
        "text":"update This Field",
        "New Key":"New Value"
    };
    return res.status(200).json(dataObj);
});

module.exports = router;
