//Importamos las librarías requeridas
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

//Documentación en https://expressjs.com/en/starter/hello-world.html
const app = express()

//Creamos un parser de tipo application/json
//Documentación en https://expressjs.com/en/resources/middleware/body-parser.html
const jsonParser = bodyParser.json()

// Crear la tabla 'todos' al iniciar la aplicación
db.createTodosTable();

app.get('/', function (req, res) {
    //Enviamos de regreso la respuesta
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'status': 'ok' }));
})


// Ruta para obtener todos los "todos"
app.get('/todos', function (req, res) {
    db.getAllTodos((err, todos) => {
        if (err) {
            console.error('Error al obtener los todos:', err);
            res.status(500).json({ error: 'Error al obtener los todos' });
            return;
        }
        res.status(201).json(todos);
    });
});


//Creamos un endpoint de login que recibe los datos como json
app.post('/login', jsonParser, function (req, res) {
    //Imprimimos el contenido del body
    console.log(req.body);

    //Enviamos de regreso la respuesta
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'status': 'ok' }));
})


// Ruta para agregar un nuevo "todo"
app.post('/agregar_todo', jsonParser, function (req, res) {
    const nuevoTodo = req.body;
    db.insertTodo(nuevoTodo, (err, todoId) => {
        if (err) {
            console.error('Error al insertar el todo:', err);
            res.status(500).json({ error: 'Error al insertar el todo' });
            return;
        }
        res.status(201).json({ id: todoId, mensaje: 'Todo insertado correctamente' });
    });
});


//Corremos el servidor en el puerto 3000
const port = 3000;

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})
