module.exports = {
    ACCESS_DENIED: {
        status: 403,
        message: 'ACCESS_DENIED_PROVIDE_AUTH_TOKEN',
        error: 'Provide [authToken, userId] in RequestHeader'
    },
    INVALID_AUTH: {
        status: 401,
        message: 'INVALID_AUTH_TOKEN'
    },
}