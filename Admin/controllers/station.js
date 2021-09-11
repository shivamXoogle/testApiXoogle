const defaults = require('../../config/defaults');
const Station = require('../../common/modules/station');

const createStation = async(body) => {
    try {
        const data = new Station(body);
        const resDB = await data.save();
        if (resDB)
            return {
                status: 200,
                data: resDB
            }
        return {
            status: 400,
            message: 'STATION_CREATION_FAILED',
            data: resDB
        }
    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const getStation = async(pageNum, pageSize, searchStr) => {
    try {
        let search = {};
        if (searchStr) {
            search = {
                stationName: { $regex: searchStr, $options: "i" }
            }
        }
        const pagination = defaults.pagination(pageNum, pageSize, await Station.countDocuments(search));
        if (pagination.status === 404)
            return pagination;
        pagination.data = await Station.find(search).skip(pagination.skips).limit(pagination.pageSize).sort({ stationName: -1 });
        return pagination;

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const getMini = async(req, res) => {
    try {
        const resDB = await Station.find({}, '_id stationName');
        if (resDB)
            return {
                status: 200,
                data: resDB
            }
        return {
            status: 404
        }

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const updateStation = async(id, body) => {
    try {
        const resDB = await Station.findOneAndUpdate({ _id: id }, body, { new: true });
        if (resDB)
            return {
                status: 200,
                data: resDB
            }
        return {
            status: 404
        };

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const deleteStation = async(id) => {
    try {
        const resDB = await Station.deleteOne({ _id: id });
        if (resDB.deletedCount == 1)
            return {
                status: 200
            };
        return {
            status: 404
        };

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

module.exports = {
    create: createStation,
    get: getStation,
    getMini: getMini,
    update: updateStation,
    delete: deleteStation
};