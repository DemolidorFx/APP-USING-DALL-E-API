const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const server = app.listen(port);
app.use(express.static('public'));
const socket = require('socket.io');
const io = socket(server);


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

io.sockets.on('connection', (socket)=>{
    console.log('conectado')
    const userId = socket.id
    socket.on('prompt', submit_prompt)
    function submit_prompt(input){
        create(input)  
    }
    async function create(input_prompt){
        const response = await openai.createImage({
            prompt: input_prompt,
            n: 1,
            size: "1024x1024",
          });
          io.to(userId).emit('final_result', response.data.data[0].url)
          console.log(response.data.data[0].url)   
    }
});
