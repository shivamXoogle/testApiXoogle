const defaults = require('../../config/defaults');
const Employee = require('../../common/modules/employee');
const encrypt = require('../../config/encrypt');
const jwt = require('../../config/jwt');

const loginEmployee = async body => {
    try {
        if (!body.email || !body.password)
            return {
                status: 400,
                message: 'REQUIRED_EMAIL_PASSWORD'
            }
        const employee = await Employee.findOne({ email: body.email });
        if (!employee)
            return {
                status: 404,
                message: 'EMPLOYEE_NOT_FOUND'
            }
            // validate password
        const validatePswdResult = await encrypt.validate(body.password, employee.password);
        if (validatePswdResult.status !== 200)
            return validatePswdResult;
        if (!validatePswdResult.data.isCorrect)
            return {
                status: 400,
                message: 'INVALID_PASSWORD'
            }

        const newEmp = {...employee._doc };
        // creating token
        const jwtToken = jwt.generate(employee._id);
        newEmp.authToken = jwtToken.authToken;
        return {
            status: 200,
            data: newEmp,
        }

    } catch (err) {
        return defaults.errorHandler(err);
    }
}

const createEmployee = async(body) => {
    try {
        const data = new Employee(body);
        // encryting password
        data.password = await encrypt.encrypt(data.password);

        const result = await data.save();
        if (result)
            return {
                status: 200,
                data: result
            }
        return {
            status: 400,
            message: 'EMPLOYEE_CREATION_FAILED',
            data: result
        }
    } catch (err) {
        return defaults.errorHandler(err);
    }
}




module.exports = {
    create: createEmployee,
    login: loginEmployee
}