

import  express, { Application} from 'express' ;


import cors from 'cors'
import { router } from './app/routes';

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';


const app:Application=express()
app.use(cors());


app.use(express.json());


app.use('/api/v1', router);

// Global error handler should be the last middleware

app.use (notFound)

app.use(globalErrorHandler);



   export default app