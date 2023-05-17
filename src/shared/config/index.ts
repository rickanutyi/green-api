type BuildTypes = 'development' | 'production'

const BASE_URL = {
    development: process.env.REACT_APP_BASE_URL,
    production: process.env.REACT_APP_BASE_URL_PROD,
}

const BUILD_TYPE = process.env.REACT_APP_BUILD_TYPE as BuildTypes;
const isProduction = () => BUILD_TYPE === 'production';

export default {
    BASE_URL: BASE_URL[BUILD_TYPE],
    isProduction: isProduction()
}