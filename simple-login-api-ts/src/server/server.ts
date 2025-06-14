import express from 'express';
import cors from 'cors';

import { PORT, HOST } from '../server/config';


import apiv1 from '../server/api/api_v1';


const app = express();

app.use(cors ({origin: 'http://localhost:3000'}));
app.use(express.json());

app.use('/api', apiv1);

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});