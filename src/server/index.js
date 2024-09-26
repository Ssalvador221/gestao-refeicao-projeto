import express from 'express'
import router from '../routes/user/users.router.js';
import cors from 'cors';
import router_refeicao from '../routes/refeicao/refeicao.router.js';


const app = express();
const PORT = 3000


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.use(router_refeicao)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))