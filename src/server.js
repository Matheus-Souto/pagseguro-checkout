import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.PAGSEGURO_TOKEN;

const server = express();
server.use(cors());

server.use((req, res) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'})
})

server.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
})