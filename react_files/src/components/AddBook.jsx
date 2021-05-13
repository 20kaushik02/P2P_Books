import React from 'react'

const AddBook = () => {
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control-inline" placeholder="Title"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control-inline" placeholder="Author"/>
                    </div>
                    <div className="col">
                        <select className="custom-select my-1 mr-sm-2">
                            <option disabled>Category</option>
                            <option value="fant">Fantasy</option>
                            <option value="mys">Mystery</option>
                            <option value="thr">Thriller</option>
                            <option value="dyst">Dystopia</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook;
