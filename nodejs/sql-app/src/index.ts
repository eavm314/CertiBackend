import express, { Request, Response } from 'express';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';

import logger from "./infrastructure/logger/logger";
import { AppDataSource } from "./infrastructure/config/dataSource";
import { env } from './infrastructure/config/config';
import { routes } from './api/controllers/apiRoutes';
import { limiter } from './api/middleware/rateLimiter';
import swaggerSpec from './api/swagger/swaggerConfig';


AppDataSource.initialize().then(() => {
    const app = express();

    // Ruta para Swagger UI
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    const PORT = env.port;
    app.use(express.json());
    app.use(limiter);
    
    app.use(
        morgan("combined", {
            stream: { write: (message: string) => logger.info(message.trim()) },
        })
    );
        
    app.get('/', (req: Request, res: Response) => {
        res.send('Servidor Up');
    });

    routes(app);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));