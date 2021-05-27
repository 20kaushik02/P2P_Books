import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BooksContext } from "../context/BooksContext";
import { FiltersContext } from "../context/FiltersContext";

import BooksActive from "../apis/BooksActiveAPI";

const SearchActiveBooks = () => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { books, setBooks } = useContext(BooksContext);
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");
  const [city, setCity] = useState("all");
  const [area, setArea] = useState("all");
  const [street, setStreet] = useState("all");
  const [locDisable, setLocDisable] = useState(false);

  const handleSearchBook = async () => {
    try {
      const response = await BooksActive.get("/filter", {
        params: {
          search_title: title,
          search_author: author,
          search_category: category,
          search_state: state,
          search_city: city,
          search_area: area,
          search_street: street,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBooks(response.data.data.Books);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters_response = await BooksActive.get("/sorting", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setFilters(filters_response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilters();
  }, []);

  const universityChecked = (e) => {
    if(!locDisable) { 
      setState("Tamil Nadu");
      setCity("Chennai");
      setArea("Guindy");
      setStreet("Anna University, Sardar Patel Road");
    setLocDisable(true);
  } else {
      setState("all");
      setCity("all");
      setArea("all");
      setStreet("all");
      setLocDisable(false);
    }
  }

  return (
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="col">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Author"
            />
          </div>

          <div className="col">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="custom-select my-1 mr-sm-4 fs-5"
            >
              <option value="all">All categories</option>
              {filters["Categories"] &&
                filters["Categories"].map((filter_option) => {
                  return (
                    <option
                      key={filter_option.books_id}
                      value={filter_option.category}
                    >
                      {filter_option.category}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="custom-select my-1 mr-sm-4 fs-5"
            >
              <option value="all">All states</option>
              {filters["States"] &&
                filters["States"].map((filter_option) => {
                  return (
                    <option
                      key={filter_option.books_id}
                      value={filter_option.state}
                    >
                      {filter_option.state}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="custom-select my-1 mr-sm-4 fs-5"
            >
              <option value="all">All cities</option>
              {filters["Cities"] &&
                filters["Cities"].map((filter_option) => {
                  return (
                    <option
                      key={filter_option.books_id}
                      value={filter_option.city}
                    >
                      {filter_option.city}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col">
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="custom-select my-1 mr-sm-4 fs-5"
            >
              <option value="all">All areas</option>
              {filters["Areas"] &&
                filters["Areas"].map((filter_option) => {
                  return (
                    <option
                      key={filter_option.books_id}
                      value={filter_option.area}
                    >
                      {filter_option.area}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col">
            <select
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="custom-select my-1 mr-sm-4 fs-5"
            >
              <option value="all">All streets</option>
              {filters["Streets"] &&
                filters["Streets"].map((filter_option) => {
                  return (
                    <option
                      key={filter_option.books_id}
                      value={filter_option.street}
                    >
                      {filter_option.street}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col">
          <input 
          type="checkbox" 
          className="university"
          style={{ marginLeft: 10, marginRight: 30 }}
          onChange={(e) => universityChecked(e)}
          />
          Anna University Student
          </div>
        </div>
        <br />
        <div className="row">
          <Link className="col" to="/search">
            <button onClick={handleSearchBook} className="btn btn-primary">
              Search P2P Books
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SearchActiveBooks;
