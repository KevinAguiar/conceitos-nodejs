const express = require('express');
const uuid = require('uuid/v4');
const app = express();

app.use(express.json());

const running = () => {
    console.log("Server running on port 3000");
};

// nodemon src/server.js

app.listen(3000, running);

app.get('/', (request, response) => {
    response.json({message:"Hello World"});
});

 let profiles = ['Igor', 'Renan', 'Bruno'];

// Rota Listar:

app.get('/profiles', (request, response) => {
    response.json(profiles);
});

// Rota Criar:

app.post('/profiles', (request, response, next)=> {
    const {name, company, techs} = request.body;

    const profile = {id: uuid(), name, company, techs};

    profiles.push(profile);

    response.json(profiles);
});

// Rota Update:

app.put('/profiles/:id', (request, response, next) => {
    const { id } = request.params;

    const {name, company, techs} = request.body;  

    const profileIndex = profiles.findIndex(
        profile => profile.id === id
    );

    if (profileIndex < 0){
        response.status(400).json({error: "Profile not found."});
    }

    const profile = {
        id: profiles[profileIndex].id,
        name,
        company,
        techs
    }

    profiles[profileIndex] = profile;

    response.json(profile);
});

app.delete('/profiles/:id', (request, response) => {
    const { id } = request.params;   

    const profileIndex = profiles.findIndex(
        profile => profile.id === id
    );

    if (profileIndex < 0){
        response.status(400).json({error: "Profile not found."});
    }

    profiles.splice(profileIndex, 1);

    response.status(200).json({Message: `Profile de id ${id} deletado`});
});




