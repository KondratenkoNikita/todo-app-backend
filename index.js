const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.get('/todo/all', async(req, res) => {
  try{
    const todos = await pool.query('SELECT * FROM todo');
    res.json(todos);
  } catch (error) {
    console.log(error)
  }
})

app.get('/todo/:id', async(req, res) => {
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
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1)",
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const changeTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    )
    res.json(changeTodo);
  } catch (error) {
    console.log(error)
  }
});


app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    )
    res.send('deleteTodo');
  } catch (error) {
    console.log(error)
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
