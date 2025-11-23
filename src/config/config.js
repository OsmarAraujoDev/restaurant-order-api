const config = {
    development: {
        dbConfig: {
            host: process.env.DB_HOST_DEV,
            user: process.env.DB_USER_DEV,
            port: process.env.DB_PORT_DEV,
            password: process.env.DB_PASSWORD_DEV,
            database: process.env.DB_NAME_DEV
        }
    },
    production: {
        dbConfig: {
            host: process.env.DB_HOST_PROD,
            user: process.env.DB_USER_PROD,
            port: process.env.DB_PORT_PROD,
            password: process.env.DB_PASSWORD_PROD,
            database: process.env.DB_NAME_PROD
        }
    }
}

module.exports = config[process.env.NODE_ENV || 'development'];