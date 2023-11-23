import swaggerJsdoc from 'swagger-jsdoc';
import { app_info } from '../../infrastructure/config/config';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: app_info.title,
        version: app_info.version,
        description: 'Esta es la documentación de mi API',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor de Desarrollo',
        },
        {
            url: 'http://192.168.1.110:3000/api',
            description: 'Servidor de QA',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;