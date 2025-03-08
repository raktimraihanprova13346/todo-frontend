import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/loginPage";
import TodoList from "./pages/todoList/todoList";
import ProtectedRoute from "./componets/protectedRoute/protectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/todo-list"
          element={
            <ProtectedRoute>
                <TodoList />
            </ProtectedRoute>
          }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
