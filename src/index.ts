import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to DemoCredit server!');
});

app.listen(PORT, () => console.log(`DemoCredit server is running on port: http://localhost:${PORT}`));
