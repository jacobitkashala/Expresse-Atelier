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
//const toCheckValue = () => {}
const toCheckValue = (reqtte) => {
    const { nom, prenom } = reqtte.body
    if (nom === "" || prenom === "") {
        return false
    } else return true
}
const toDeleteStudent = (req, resp) => {
    const { id } = req.params;
    const studentIdFound = students.some(student => student.id === parseInt(id))
    if (studentIdFound) {
        const studentsUpdate = filterBD(id);
        resp.json(studentsUpdate);

    } else {
        resp.status(404).json({ error: `No student id ${id}` })
            //  resp.send("<h1>404 error</h1>");
    }

};
const filterBD = (id) => {
    const studentsUpdate = students.filter((student) => student.id !== parseInt(id));
    return studentsUpdate;
}
const toInsertStudent = ({ nom, prenom }) => {
    const newStudent = {
        id: uuid.v4(),
        nom: nom,
        prenom: prenom,
    };
    // students.push(newStudent);
    return newStudent;
}
const toUpdataStudent = (reqtte, resp) => {
    const { id } = reqtte.params;
    const studentIdFound = students.some(student => student.id === parseInt(id));
    let studentDelete = filterBD(id);

    if (studentIdFound) {
        const isEmpty = toCheckValue(reqtte);
        const newStudent = isEmpty ? toInsertStudent(reqtte.body) : (resp.status(404).json({ error: `Remplir tout le champs` }))
        studentDelete.push(newStudent);
        const studentUpdate = studentDelete;
        resp.json(studentUpdate);

    } else {
        resp.status(404).json({ error: `No student id ${id}` })

    }

}

const PORT = process.env.PORT || 8080;

app.get("/", (req, resp) => {
    req.status(404, )
    resp.send("<h1>Precisez l'information</h1>");
    // resp.json(students);
})

app.get("/api/students", (req, resp) => {
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

//faire le post ajout
app.post("/api/students", (req, resp) => {

    const isEmpt = toCheckValue(req)

    if (isEmpt) {
        toInsertStudent(req.body)
            // students.push(newStudent);
        resp.json(students);
    } else {
        resp.status(404).json({ error: `error empty value` })
        resp.send("<h1>404 error</h1>");
    }
})

//faire le delete supprimer
app.delete("/api/students/:id", toDeleteStudent);

app.delete("/api/students", (req, resp) => {
        const studentvide = [];
        students = studentvide;
        resp.json(students);
        resp.send("<h1>suppression ok</h1>");
    })
    //faire put mises a jour
app.put("/api/students/:id", toUpdataStudent)

app.listen(PORT, () => {
    console.log(`Le server tourn est sur le port ${PORT}`)
});