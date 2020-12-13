const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
  try{
    const poolRows = await pool.query('SELECT * FROM todo');
    const { rows } = poolRows;
    res.json(rows);
  } catch (error) {
    console.log(error)
  }
})

app.get('todo/:id', async(req, res) => {
  try{
    const { id } = req.query;
    const todo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [id]
    );
      res.json(todo);
  } catch (error) {
    console.log(error)
  }
})

app.post('/todo/add', async (req, res) => {
  try {
    const { description } = req.body;
    await pool.query(
      "INSERT INTO todo (description) VALUES($1)",
      [description]
    );

    res.json('Todo succes added!');
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const changeTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2"
      [description, id]
    )
    res.json('Todo with id ${id} success edited');
  } catch (error) {
    console.log(error)
  }
});


app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    )
    res.send(`Delete Todo with id ${id}`);
  } catch (error) {
    console.log(error)
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
