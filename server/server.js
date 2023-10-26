import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai';
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//connecting Mongodb
import {connectDB} from './config/db.js'
connectDB();



//importing routes
import userRoutes from './routes/userRoutes.js'


const openai = new OpenAI({ 
  apiKey:process.env.OPENAI_API_KEY 
  
});

const PORT = process.env.PORT ;



app.post('/',  async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 2000,
    });
    res.status(200).send({
      bot: response.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.use(userRoutes);

app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));