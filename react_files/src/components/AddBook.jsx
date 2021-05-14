import React, {useState} from 'react'
import Books from '../apis/BooksAPI';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const response = await Books.post("/", {
                title,
                author,
                category
            });
            console.log("Added book to database:" + response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="mb-4">
            <form action="">
                <div>
                    <div>
                        Title of book:
                        <input value={title} onChange={(e) => setTitle(e.target.value)} 
                        type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div>
                        Author of book:
                        <input value={author} onChange={(e) => setAuthor(e.target.value)} 
                        type="text" className="form-control" placeholder="Author"/>
                    </div>
                    <div>
                        Category of book (only one):
                        <input value={category} onChange={(e) => setCategory(e.target.value)} 
                        type="text" className="form-control" placeholder="Category"/>
                    </div>
                    <div>
                        <button onClick={handleAddBook} type="submit" className="btn btn-primary">Add Book</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddBook;
