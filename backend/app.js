// app.js
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routers/userRoute.js';
import petRoute from './routers/petRoute.js';
import { config } from './config/config.js';
import { swaggerOptions } from './config/swagger.js';
import cors from 'cors'

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {dbName: 'backendAssignment'});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', userRoute);
app.use('/api', petRoute);

app.get('/', (req, res) => {
    res.send('Hello, Swagger!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});