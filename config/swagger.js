const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  // customCss: '.topbar { display: none }',
  definition: {
    openapi: '3.1.0',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],

    info: {
      title: 'Swagger test',
      version: '1.0.0',
      description: 'This is website test for swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Abdullah',
        url: 'https://abdullah.software',
        email: 'email@abdullah.software',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerOptions = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerOptions };
