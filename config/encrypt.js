const bycrypt = require('bcryptjs');

module.exports = {
    encrypt: async str => {
        try {
            if (!str)
                return {
                    status: 400,
                    message: 'REQUIRED_STRING'
                }
            const salt = await bycrypt.genSalt(10);
            const hashed = await bycrypt.hash(str, salt);
            return hashed;

        } catch (err) {
            return str
        }
    },
    validate: async(str, hashed) => {
        try {
            const result = await bycrypt.compare(str, hashed);
            return {
                status: 200,
                data: {
                    isCorrect: result
                }
            };

        } catch (err) {
            return {
                status: 500,
                message: err.toString()
            };
        }
    }
}