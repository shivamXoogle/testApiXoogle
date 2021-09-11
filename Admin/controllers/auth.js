const Admin = require('../../common/modules/admin');
const defaults = require('../../config/defaults');
const encrypt = require('../../config/encrypt');
const jwt = require('../../config/jwt');

const login = async(body) => {
    try {
        const admin = await Admin.findOne({ email: body.email });
        if (!admin)
            return {
                status: 404,
                message: 'Invalid Email and Password'
            }

        const validatePswdResult = await encrypt.validate(body.password, admin.password);
        if (validatePswdResult.status !== 200)
            return validatePswdResult;
        if (!validatePswdResult.data.isCorrect)
            return {
                status: 400,
                message: 'Invalid Password'
            }

        // gen auth token
        const authToken = jwt.generate(admin._id);
        const data = {...admin._doc, ...authToken };
        delete data.password;
        return {
            status: 200,
            data: data
        }


    } catch (err) {
        return defaults.errorHandler(err);
    }
}

module.exports = {
    login: login
}