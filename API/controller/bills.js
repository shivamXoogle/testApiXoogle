const Bill = require('../../common/modules/bill');
const defaults = require('../../config/defaults');

const createBill = async(body) => {
    try {
        const data = new Bill(body);
        const result = await data.save();
        if (result)
            return {
                status: 200,
                data: result
            }
        return {
            status: 400,
            message: 'BILL_CREATION_FAILED',
            data: result
        }
    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const getAll = async(pageNum, pageSize) => {
    const pagination = defaults.pagination(pageNum, pageSize, await Bill.countDocuments());
    if (pagination.status === 404)
        return pagination;
    pagination.data = await Bill.find({}).skip(pagination.skips).limit(pagination.pageSize);
    return pagination;
}

// const getBill = async(where = {}) => {
//     try {
//         const resDB = await Bill.find(where).populate('Station').populate('generatedBy');
//         if (resDB.length > 0)
//             return {
//                 status: 200,
//                 data: where._id ? resDB[0] : resDB
//             }
//         return {
//             status: 404,
//             message: 'BILL_NOT_FOUND',
//             data: []
//         }

//     } catch (err) {
//         return defaults.errorHandler(err);
//     }
// }

module.exports = {
    create: createBill,
    get: getAll
}