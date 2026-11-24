import express from 'express';
import auth from './routes/auth.js';
import project from './routes/project.js';
import task from './routes/task.js'
import connectToMongo from './db.js';
import dotenv from "dotenv";
import path from "node:path";
import dns from "node:dns";
import cors from 'cors';
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
dns.setServers(["8.8.8.8"]);
dotenv.config( {path: path.resolve("../backend/.env")});
 connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//linking the routes
app.use('/api/auth',auth);
app.use('/api/project',project);
app.use('/api/task',task);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`)
})