import express from 'express';
import cors from 'cors';

import { PORT, HOST } from './config.js';
import apiv1 from './api/v1/api_v1.js';


const server = express();

server.use(cors());
server.use(express.json());
  
server.use('/api', apiv1);


server.listen(PORT, HOST, () => {
    console.log(`Server Running on http://${HOST}:${PORT}`);
});