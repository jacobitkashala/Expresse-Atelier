const express = require("express");
const students = require("./Bd");
const uuid = require("uuid");

const app = express();

app.use(express.json());

/*
npm init -y
npm i express
npm nodemon permet de ne plus lancer le server
npm run le nom du script
on utilise get de app pour manipuler le response et du requette

*/


const PORT = process.env.PORT || 8080;

app.get("/", (req, resp) => {
    resp.send("<h1>Precisez l'information</h1>");
    // resp.json(students);
})

app.get("/api/students", (req, resp) => {
    //resp.send("<h1>KDA is the best academy</h1>");
    resp.json(students);
})

app.get("/api/students/:id", (req, resp) => {
        //resp.send("<h1>KDA is the best academy</h1>");
        //resp.send(req.params.id)
        //const student = students.find((student) => student.id == req.params.id)
        const { id } = req.params.id
        const studentIdFound = students.some(student => student.id === parseInt(id))
        if (studentIdFound) {
            const student = students.find((student) => student.id == id);
        } else {
            //  resp.status(404).json({ error: `No student id ${id}` })
            resp.send("<h1>404 error</h1>");
        }

        resp.json(student);
    })
    //faire le post

app.post("/api/students", (req, resp) => {
    console.log(req.body)
    const { nom, prenom } = req.body

    const newStudent = {
        id: uuid.v4(),
        nom: nom,
        prenom: prenom,
    };
    students.push(newStudent);
})


app.listen(PORT, () => {
    console.log(`Le server tourn est sur le port ${PORT}`)
});