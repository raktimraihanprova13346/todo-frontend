import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/./loginPage/loginPage";
import TodoList from "./pages/todoList/todoList";
import ProtectedRoute from "./componets/protectedRoute/protectedRoute";
import SignUp from "./pages/signUp/signUp";
import UnAuthenticatedGuard from "./componets/authGuard/authGuard";
import NotFound from "./pages/notFound/notFound";
import TagList from "./pages/tagList/tags";
import TagAdd from "./pages/tagAdd/tagAdd";
import TodoAdd from "./pages/todoAdd/todoAdd";
import {useDispatch} from "react-redux";
import {logout} from "./slices/userSlice";
import Cookie from "js-cookie";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            window.alert("Are you sure you want to leave?");
            event.preventDefault();
            dispatch(logout(false));
            Cookie.remove("accessToken");
            navigate("/", {replace: true});
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    },[dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
            <UnAuthenticatedGuard>
             <LoginPage />
            </UnAuthenticatedGuard>
        }></Route>

        <Route path="/signup" element={
            <UnAuthenticatedGuard>
                <SignUp />
            </UnAuthenticatedGuard>
        }></Route>

        <Route path="/todo-list"
          element={
            <ProtectedRoute>
                <TodoList />
            </ProtectedRoute>
          }>
        </Route>

        <Route path="/tags" element={
            <ProtectedRoute>
                <TagList />
            </ProtectedRoute>}>
        </Route>

          <Route path="/add-tag" element={
              <ProtectedRoute>
                  <TagAdd />
              </ProtectedRoute>}>
          </Route>

          <Route path="/add-todo" element={
              <ProtectedRoute>
                  <TodoAdd />
              </ProtectedRoute>}>
          </Route>

        <Route path="*" element={<NotFound />} />


      </Routes>
    </div>
  );
}

export default App;
