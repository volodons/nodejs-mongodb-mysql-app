const express = require('express');
const connectMongoDB = require('./config/mongoDatabase');
const { sequelize, initMySQL } = require('./config/sqlDatabase');
const mongoTodosRouter = require('./routes/mongoTodos');
const sqlTodosRouter = require('./routes/sqlTodos');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

connectMongoDB();
initMySQL();

app.use('/api/mongo/todos', mongoTodosRouter);
app.use('/api/sql/todos', sqlTodosRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    sequelize.sync();
});
