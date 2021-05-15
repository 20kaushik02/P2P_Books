import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { BooksContextProvider } from "./context/BooksContext";
import { CategoriesContextProvider } from "./context/CategoriesContext";

import Home from "./routes/Home";
import NewBook from "./routes/NewBook";
import SearchResults from "./routes/SearchResults";

import Login from "./components/login";
import Register from "./components/register";

import AuthAPI from "./apis/AuthAPI";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuthenticated = async () => {
        try {
            const res = await AuthAPI.post("/verify", {}, {
                headers: { token: localStorage.token },
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
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/"
                                component={(props) => isAuthenticated ? (<Home {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)} />
                            <Route exact path="/login"
                                component={(props) => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/" />)} />
                            <Route exact path="/register"
                                component={(props) => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to="/" />)}/>
                            <Route exact path="/newbook"
                                component={(props) => isAuthenticated ? (<NewBook {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
                            <Route exact path="/search"
                                component={(props) => isAuthenticated ? (<SearchResults {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
                        </Switch>
                    </Router>
                </div>
            </CategoriesContextProvider>
        </BooksContextProvider>
    );
};

export default App;
