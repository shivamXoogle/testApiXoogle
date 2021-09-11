const defaults = require('../../config/defaults');
const Bill = require('../../common/modules/bill');

const getSales = async(pageNum, pageSize, date, station) => {
    try {
        let filter = {};
        if (date || station) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            filter = {
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
            if (station) {
                filter.Station = station;
            }
        }
        const pagination = defaults.pagination(pageNum, pageSize, await Bill.countDocuments(filter));
        if (pagination.status === 404)
            return pagination;
        pagination.data = await Bill.find(filter).skip(pagination.skips).limit(pagination.pageSize).populate('Station', 'stationName').populate('generatedBy', 'name').sort({ updatedAt: -1 });
        return pagination;

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

// export
const excel = require('exceljs');

const exportData = async(req, res) => {
    try {
        const fileName = 'IGL_SALES';
        const workbook = new excel.Workbook(); //creating workbook
        const worksheet = workbook.addWorksheet('SALES'); //creating worksheet

        // getting header
        const header = [
            'Station',
            'generatedBy',
            'dispensor',
            'side',
            'name',
            'contactNumber',
            'billNumber',
            'vehicleNumber',
            'fuelType',
            'CNGRate',
            'quantity',
            'amount',
            'createdAt'
        ];

        const columns = []
        for (item of header) {
            columns.push({ header: item, width: 20, key: item })
        }
        worksheet.columns = columns;

        // getting data
        const salesRes = await getSales(1, 10000);

        // writin  data
        for (item of salesRes.data) {
            worksheet.addRow(item);
        }

        worksheet.columns.forEach(function(column, i) {
            var maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function(cell) {
                var columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });

        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // res.setHeader('Content-Disposition', 'attachment; filename=' + fileName + '.xlsx');
        await workbook.xlsx.write(res);
        res.attachment('filename.csv');
        res.status(200).send(workbook);


    } catch (err) {
        return res.json(defaults.errorHandler(err));
    }
}
module.exports = {
    get: getSales,
    export: exportData
}