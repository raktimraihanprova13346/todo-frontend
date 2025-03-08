import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/loginPage";
import TodoList from "./pages/todoList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/todo-list" element={<TodoList />}></Route>


      </Routes>
    </div>
  );
}

export default App;
