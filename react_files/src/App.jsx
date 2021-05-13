import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { BooksContextProvider } from './context/BooksContext';
import Home from './routes/Home';
import NewBook from './routes/NewBook';

const App = () => {
    return (
        <BooksContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path = "/" component={Home}/>
                        <Route exact path = "/newbook" component={NewBook}/>
                    </Switch>
                </Router>
            </div>
        </BooksContextProvider>
                
    );
}

export default App;
