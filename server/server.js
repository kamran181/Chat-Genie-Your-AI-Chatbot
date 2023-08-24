import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai';
dotenv.config()


const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY 
  
});

const PORT = process.env.PORT ;


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Chat Genie'

  })
})

app.post('/', async (req, res) => {
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

console.log('hello world');
app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));