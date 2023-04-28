export const envConfiguration = () => ({
    environment: process.env.NODE_ENV || 'development',
    databaseName: process.env.DATABASE_NAME,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databasePort: parseInt(process.env.DATABASE_PORT),
    databasePortProd: parseInt(process.env.DATABASE_PORT_PROD),
    databaseHostProd: process.env.DATABASE_HOST,
    databaseHost: process.env.DATABASE_HOST,
    portServer: parseInt(process.env.PORT, 10) || 3008,
    portServerProd: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
    satage: process.env.STAGE,
    urlApi: process.env.URL_API,

})
