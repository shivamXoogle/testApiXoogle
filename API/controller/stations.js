const Station = require('../../common/modules/station');
const defaults = require('../../config/defaults');

const getAllStation = async() => {
    try {
        const resDB = await Station.find({});
        if (resDB.length > 0)
            return {
                status: 200,
                data: resDB
            }
        return {
            status: 404,
            data: []
        }

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

module.exports = {
    getAll: getAllStation
}