import { useState } from "react";

export const useShareableState = () => {
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editIngredientId, setEditIngredientId] = useState(-1);
  const [showEditMessage, setShowEditMessage] = useState(false);

  return {
    inputText,
    setInputText,
    currentPage,
    setCurrentPage,
    editIngredientId,
    setEditIngredientId,
    showEditMessage,
    setShowEditMessage,
  };
};
