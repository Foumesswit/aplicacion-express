const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos (si no existe, se creará automáticamente)
const db = new sqlite3.Database('./todo.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err)
})

// Función para crear la tabla 'todos'
function createTodosTable() {
    db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT NOT NULL, created_at INTEGER)");
}

// Función para insertar un nuevo "todo" en la tabla "todos"
function insertTodo(todo, callback) {
    db.run("INSERT INTO todos (todo, created_at) VALUES (?, ?)", [todo.todo, Date.now()], function(err) {
        if (err) {
            return callback(err);
        }
        console.log(`Se insertó correctamente el todo con ID: ${this.lastID}`);
        callback(null, this.lastID);
    });
}

// Función para obtener todos los "todos" de la tabla "todos"
function getAllTodos(callback) {
    db.all("SELECT * FROM todos", function(err, rows) {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
}

module.exports = {
    createTodosTable,
    insertTodo,
    getAllTodos
};
