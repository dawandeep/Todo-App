import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import apiConfig from './config';
import AuthHoc from './AuthHoc';
function TodoList() {
  const [checked, setChecked] = useState([0]);
  const [todoItem, setTodoItem] = useState('')
  const [todos, setTodos] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const SaveItem = () => {
    fetch(`${apiConfig.todoapi}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ text: todoItem, email: localStorage.getItem('email') })
    }).then(res => res.json())
      .then(data => GetItems());
  }
  const GetItems = () => {
    fetch(`${apiConfig.todoapi}/todos/${localStorage.getItem('email')}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTodos(data);
      });
  }

  useEffect(() => {
    GetItems();
  }, [])

  const RemoveItem = (id) => {
    fetch(`${apiConfig.todoapi}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => GetItems());
  }

  const MarkCompleted = (id) => {
    let completedStatus = todos.find(y => y._id === id).isCompleted;
    let status = completedStatus ? false : true;
    todos.filter(x => x._id === id)[0].isCompleted = status;
    fetch(`${apiConfig.todoapi}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ isCompleted: status })
    })
      .then(res => res.json())
      .then(data => {
        GetItems();
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <TextField onChange={(e) => setTodoItem(e.target.value)} className="mt-3" id="standard-basic" label="Enter Text" variant="standard" fullWidth />
          <Button onClick={SaveItem} className="mt-3 float-end" variant="contained">Add Item</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
              todos?.map(item =>
                <div key={item._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton onClick={RemoveItem.bind(this, item._id)} edge="end" aria-label="comments">
                        <ClearIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(item._id)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          onChange={MarkCompleted.bind(this, item._id)}
                          checked={item.isCompleted}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': item._id }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.text} style={item.isCompleted ? { textDecoration: 'line-through' } : null} />
                    </ListItemButton>

                  </ListItem>
                </div>
              )
            }
          </List>
        </div>
      </div>
    </div>
  )
}

export default AuthHoc(TodoList);