import React from 'react'

const SearchBox = () => {
    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Author"/>
                    </div>
                    <div className="col">
                        <select className="custom-select my-1 mr-sm-2">
                            <option value="all">Any</option>
                            <option value="fant">Fantasy</option>
                            <option value="mys">Mystery</option>
                            <option value="thr">Thriller</option>
                            <option value="dyst">Dystopia</option>
                        </select>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBox;
