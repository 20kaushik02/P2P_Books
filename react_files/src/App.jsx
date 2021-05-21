import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { BooksContextProvider } from "./context/BooksContext";
import { CategoriesContextProvider } from "./context/CategoriesContext";

import Home from "./routes/Home";
import NewBook from "./routes/NewBook";
import SearchResults from "./routes/SearchResults";

import Login from "./components/Login";
import Register from "./components/Register";

import AuthAPI from "./apis/AuthAPI";
import UserBooks from "./routes/UserBooks";
import Sidebar from "./components/Sidebar";
import NewActiveBook from "./routes/NewActiveBook";
import NewActiveBook_2 from "./routes/NewActiveBook_2";
import SuccessPage from "./routes/SuccessPage";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuthenticated = async () => {
        try {
            const res = await AuthAPI.post("/verify", {}, {
                headers: { 
                    token: localStorage.getItem("token") 
                },
            });
            const parseRes = res.data;

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <BooksContextProvider>
            <CategoriesContextProvider>
                <Router>
                    <Sidebar setAuth={setAuth}/>
                        <Switch>
                            <div className="container">
                                <Route exact path="/"
                                    component={(props) => isAuthenticated ? (<Home/>) : (<Redirect to="/login" />)} />
                                <Route exact path="/login"
                                    component={(props) => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/>) : (<Redirect to="/" />)} />
                                <Route exact path="/register"
                                    component={(props) => !isAuthenticated ? (<Register {...props} setAuth={setAuth}/>) : (<Redirect to="/" />)}/>
                                <Route exact path="/newbook"
                                    component={(props) => isAuthenticated ? (<NewBook/>) : (<Redirect to="/login" />)}/>
                                <Route exact path="/newactivebook"
                                    component={(props) => isAuthenticated ? (<NewActiveBook/>) : (<Redirect to="/login" />)}/>
                                <Route exact path="/newactivebook2"
                                    component={(props) => isAuthenticated ? (<NewActiveBook_2/>) : (<Redirect to="/login" />)}/>
                                <Route exact path="/search"
                                    component={(props) => isAuthenticated ? (<SearchResults/>) : (<Redirect to="/login" />)}/>
                                <Route exact path="/user-books"
                                    component={(props) => isAuthenticated ? (<UserBooks/>) : (<Redirect to="/login" />)}/>
                                <Route exact path="/success"
                                    component={(props) => isAuthenticated ? (<SuccessPage {...props}/>) : (<Redirect to="/login" />)}/>
                            </div>
                        </Switch>
                </Router>
            </CategoriesContextProvider>
        </BooksContextProvider>
    );
};

export default App;
