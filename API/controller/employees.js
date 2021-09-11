const defaults = require('../../config/defaults');
const Employee = require('../../common/modules/employee');

const updateEmployee = async(where, body) => {
    try {
        if (!where.employeeId)
            return {
                status: 400,
                message: 'REQUIRED_EMPLOYEE_ID'
            }
        else if (where.employeeId.length > 24) {
            return {
                status: 400,
                message: 'INVALID_EMPLOYEE_ID'
            }
        }
        const employee = await Employee.findById(where.employeeId);
        if (!employee)
            return {
                status: 404,
                message: 'EMPLOYEE_NOT_FOUND',
                data: []
            }
        const updateBody = {};
        if (employee.fingerprint1)
            updateBody.fingerprint2 = body.fingerprint
        else
            updateBody.fingerprint1 = body.fingerprint;

        const result = await Employee.findOneAndUpdate({ _id: where.employeeId }, updateBody);
        const newEmp = {...result._doc };
        delete newEmp.password;
        return {
            status: 200,
            data: newEmp
        }

    } catch (err) {
        return defaults.errorHandler(err);
    }
}
const deleteEmployee = async() => {

}



module.exports = {
    update: updateEmployee,
    delete: deleteEmployee
};