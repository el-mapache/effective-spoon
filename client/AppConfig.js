const AppConfig = require('../app.json');

const envConfig = {
  development: {
    baseUrl: 'http://localhost:3001'
  },
  qa: {},
  production: {
    protocol: 'https://'
  }
};

const envProps = envConfig[AppConfig.environment];

for (const attribute in envProps) {
  AppConfig[attribute] = envProps[attribute];
}

// add helper properties for checking for a specific environment
AppConfig.isDevelopment = AppConfig.environment === 'development';
AppConfig.isQA = AppConfig.environment === 'qa';
AppConfig.isProduction = AppConfig.environment === 'production';

export default AppConfig;
