module.exports = {
    errorHandler: (err) => {
        return {
            status: 500,
            message: err.message
        }
    },
    pagination: (pageNum = 0, pageSize = 0, total = 0) => {
        if (!Number(pageNum) || !Number(pageSize) || !Number(total))
            return {
                status: 404,
                total: total,
                pageSize: 0,
                skips: 0,
                pageNum: 0,
                lastPage: 0
            }
        pageNum = Number(pageNum);
        pageSize = Number(pageSize);
        total = Number(total);
        let lastPage = (total % pageSize !== 0 && total !== 0) ? 1 : 0;
        let divisions = total > 0 ? Math.floor(total / pageSize) : 0;
        lastPage += divisions;
        return {
            status: (lastPage >= pageNum && pageNum > 0) ? 200 : 404,
            total: total,
            pageSize: pageSize,
            skips: pageNum > 0 ? pageSize * (pageNum - 1) : 0,
            pageNum: pageNum,
            lastPage: lastPage
        }
    }
}