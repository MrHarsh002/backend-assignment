import express from 'express';
import dotenv from 'dotenv';
import allowanceRouter from './routes/allowanceRoutes.js';
import connectDB from './config/dbConfig.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/requests', allowanceRouter);
app.use('/api/users', userRouter);

connectDB();

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})