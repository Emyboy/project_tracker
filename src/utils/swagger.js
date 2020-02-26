import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const setupSwagger = (app) => {
  const swaggerDefinition = {
    info: {
      title: 'Project Tracker',
      version: '1.0.0',
      description: 'This lets developers keep track of project tasks',
    },
    basePath: '/api/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  };
  const options = {
    swaggerDefinition,
    apis: ['./src/swagger/**/*.yml'],
  };
  const swaggerSpec = swaggerJsdoc(options);

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
export default setupSwagger;
