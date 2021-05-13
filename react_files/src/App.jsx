import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { BooksContextProvider } from './context/BooksContext';
import Home from './routes/Home';

const App = () => {
    return (
        <BooksContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path = "/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        </BooksContextProvider>
                
    );
}

export default App;
