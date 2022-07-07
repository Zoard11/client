import axios from "axios";
import React, { useState, useEffect } from "react";
import { ipAddress } from "../constants";
import Table from "./Table";
import { useBetween } from "use-between";
import { useShareableState } from "./UseBetween";
import EditModal from "./EditModal";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
axios.defaults.baseURL = `http://${ipAddress}`;

const InformationTable = () => {
  const [ingredients, setIngredients] = useState([]);
  const {
    inputText,
    currentPage,
    setCurrentPage,
    editIngredientId,
    setEditIngredientId,
    showEditMessage,
    setShowEditMessage,
  } = useBetween(useShareableState);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [dataPerPage, setDataPerPage] = useState(10);

  const [lastPage, setLastPage] = useState(-1);

  const [selectedIngredient, setSelectedIngredient] = useState({});

  const previousButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextButton = () => {
    setCurrentPage(currentPage + 1);
  };

  const firstButton = () => {
    setCurrentPage(1);
  };

  const lastButton = () => {
    setCurrentPage(-1);
  };

  const changePageButton = (index) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const result = await axios.get('/api/topTen');
      let indexOfFirstResult;
      if (currentPage !== -1) {
        indexOfFirstResult = (currentPage - 1) * dataPerPage;
      } else {
        indexOfFirstResult = -1;
      }

      await axios
        .get("/api", {
          params: {
            dataPerPage: dataPerPage,
            indexOfFirstResult: indexOfFirstResult,
            search: inputText,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            setError(false);
            if (currentPage !== -1) {
              setIngredients(resp.data);
            } else {
              setCurrentPage(resp.data.currentPage);
              setIngredients(resp.data.result);
              setLastPage(resp.data.currentPage);
            }
          }
        })
        .catch(function (error) {
          setError(true);
        });
      setLoading(false);
    })();
  }, [currentPage, inputText]);

  useEffect(() => {
    if (editIngredientId !== -1) {
      setSelectedIngredient(ingredients[editIngredientId]);
      setShowEditMessage(true);
    }
  }, [editIngredientId]);

  if (loading === true) {
    return (
      <div>
        <h1>Ingredients</h1>
        <b>Loading...</b>
      </div>
    );
  }
  if (error === true) {
    return (
      <div>
        <h1>Ingredients</h1>
        <b>Error during loading data</b>
      </div>
    );
  }

  if (ingredients.length === 0) {
    return (
      <div>
        <h1>Ingredients</h1>
        <b>There is no results.</b>
      </div>
    );
  }

  return (
    <div>
      <h1>Ingredients</h1>

      <Table data={ingredients} />

      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={firstButton}>
            First
          </button>
        </li>

        {currentPage > 1 && (
          <li className="page-item ">
            <button className="page-link" onClick={previousButton}>
              Previous
            </button>
          </li>
        )}
        {currentPage > 3 && (
          <li className="page-item ">
            <button className="page-link">...</button>
          </li>
        )}
        {currentPage > 2 && (
          <li className="page-item ">
            <button
              className="page-link"
              onClick={() => changePageButton(currentPage - 2)}
            >
              {currentPage - 2}
            </button>
          </li>
        )}
        {currentPage > 1 && (
          <li className="page-item ">
            <button
              className="page-link"
              onClick={() => changePageButton(currentPage - 1)}
            >
              {currentPage - 1}
            </button>
          </li>
        )}

        <li className="page-item active ">
          <button className="page-link">{currentPage}</button>
        </li>

        {currentPage !== lastPage && (
          <li className="page-item ">
            <button
              className="page-link"
              onClick={() => changePageButton(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          </li>
        )}
        {currentPage + 1 < lastPage && lastPage !== -1 && (
          <li className="page-item ">
            <button
              className="page-link"
              onClick={() => changePageButton(currentPage + 2)}
            >
              {currentPage + 2}
            </button>
          </li>
        )}
        {currentPage + 2 < lastPage && lastPage !== -1 && (
          <li className="page-item ">
            <button className="page-link">...</button>
          </li>
        )}
        {currentPage !== lastPage && (
          <li className="page-item">
            <button className="page-link" onClick={nextButton}>
              Next
            </button>
          </li>
        )}

        <li className="page-item">
          <button className="page-link" onClick={lastButton}>
            Last
          </button>
        </li>
      </ul>

      {showEditMessage && (
        <EditModal
          show={showEditMessage}
          setShow={setShowEditMessage}
          setEditIngredientId={setEditIngredientId}
          ingredient={selectedIngredient}
          setIngredient={setSelectedIngredient}
        />
      )}
    </div>
  );
};

export default InformationTable;
