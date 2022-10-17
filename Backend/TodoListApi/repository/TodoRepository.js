const TodoModel = require('../models/TodoModel');
const { v4: uuidv4 } = require('uuid');
const GetTodos = () => {
    return new Promise((resolve, reject) => {
        TodoModel.find({}, (err, todos) => {
            if (!err) {
                resolve(todos);
            } else {
                reject(err);
            }
        });
    });
}

const GetTodo = (email) => {
    return new Promise((resolve, reject) => {
        console.log(email);
        TodoModel.find({ 'email': email }, (err, todos) => {
            if (!err) {
                console.log(todos);
                resolve(todos);
            } else {
                reject(err);
            }
        });
    });
}

const AddTodo = (todo) => {
    return new Promise((resolve, reject) => {
        let newtodo = new TodoModel({
            _id: uuidv4(),
            text: todo.text,
            email: todo.email
        });
        newtodo.save((err) => {
            if (!err) {
                resolve({ status: 200, message: 'Todo Saved' });
            } else {
                reject(err);
            }
        });
    });
}

const UpdateTodo = (id, todo) => {
    return new Promise((resolve, reject) => {
        let newtodo = new TodoModel({
            text: todo.text,
            isCompleted: todo.isCompleted
        });
        TodoModel.findOneAndUpdate({ _id: id }, newtodo, (err, data) => {
            if (!err) {
                resolve({status: 200, message: 'Todo Updated'});
            } else {
                reject(err);
            }
        });
    });
}

const DeleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        TodoModel.deleteOne({ _id: id }, (err, todos) => {
            if (!err) {
                resolve(todos);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = { GetTodos, GetTodo, AddTodo, UpdateTodo, DeleteTodo }