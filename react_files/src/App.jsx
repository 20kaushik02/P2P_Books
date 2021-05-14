import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { BooksContextProvider } from './context/BooksContext';
import { CategoriesContextProvider } from './context/CategoriesContext';
import Home from './routes/Home';
import NewBook from './routes/NewBook';
import SearchResults from './routes/SearchResults';

const App = () => {
    return (
        <BooksContextProvider>
            <CategoriesContextProvider>
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path = "/" component={Home}/>
                            <Route exact path = "/newbook" component={NewBook}/>
                            <Route exact path = "/search" component={SearchResults}/>
                        </Switch>
                    </Router>
                </div>
            </CategoriesContextProvider>
        </BooksContextProvider>
                
    );
}

export default App;
