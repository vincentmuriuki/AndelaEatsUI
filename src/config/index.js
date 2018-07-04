
const allConfig = {

  development: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com',
    API_BASE_URL: 'http://private-135e48-andelaeatsmockserver.apiary-mock.com',
    BASE_URL: 'http://andelaeats-dev.andela.com:3000',
  },

  production: {
    ANDELA_API_BASE_URL: 'https://api.andela.com',
    API_BASE_URL: 'https://andelaeats-staging-test.andela.com/api/v1',
    BASE_URL: 'https://andelaeats.andela.com',
  },

  staging: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com',
    API_BASE_URL: 'https://andelaeats-staging-test.andela.com/api/v1',
    BASE_URL: 'https://andelaeats-staging-test.andela.com',
  },

  test: {
    ANDELA_API_BASE_URL: 'https://api.andela.com',
    API_BASE_URL: 'http://private-135e48-andelaeatsmockserver.apiary-mock.com',
    BASE_URL: 'http://andelaeats-dev.andela.com:3000',
  },

};

export const config = allConfig[process.env.NODE_ENV];