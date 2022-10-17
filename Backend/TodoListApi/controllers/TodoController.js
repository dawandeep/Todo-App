const repo = require('../repository/TodoRepository');

const GetTodos = (req, res) => {
    repo.GetTodos().then(data => {
        res.status(200).send(data);
    });
}

const GetTodo = (req, res) => {
    repo.GetTodo(req.params.email).then(data => {
        res.status(200).send(data);
    });
}

const AddTodo = (req, res) => {
    repo.AddTodo(req.body).then(data => {
        res.status(200).send(data);
    });
}

const UpdateTodo = (req, res) => {
    repo.UpdateTodo(req.params.id, req.body).then(data => {
        res.status(200).send(data);
    });
}

const DeleteTodo = (req, res) => {
    repo.DeleteTodo(req.params.id).then(data => {
        res.status(200).send(data);
    });
}

module.exports = { GetTodos, GetTodo, AddTodo, UpdateTodo, DeleteTodo }