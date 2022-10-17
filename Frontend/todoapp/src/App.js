import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import AppContext from "./AppContext";
import { useReducer } from "react";
import reducer, { initialState } from "./Reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ state, dispatch }}>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<TodoList />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
