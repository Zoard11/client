import {useState} from 'react';

export const useShareableState = () => {
  const [inputText, setInputText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editIngredientId, setEditIngredientId] = useState(-1);
  const [responseSuccesfull, setResponseSuccesfull] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [deleteIngredientId, setDeleteIngredientId] = useState(-1);
  const [action, setAction] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [order, setOrder] = useState('');
  const [refresh, setRefresh] = useState(false);

  return {
    inputText,
    setInputText,
    currentPage,
    setCurrentPage,
    editIngredientId,
    setEditIngredientId,
    responseSuccesfull,
    setResponseSuccesfull,
    showResponse,
    setShowResponse,
    responseError,
    setResponseError,
    deleteIngredientId,
    setDeleteIngredientId,
    action,
    setAction,
    showAddNew,
    setShowAddNew,
    order,
    setOrder,
    refresh,
    setRefresh
  };
};
