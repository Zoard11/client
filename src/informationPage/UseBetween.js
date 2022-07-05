import {useState } from 'react'; 

export const useShareableState = () => {

    const [inputText, setInputText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    return {
        inputText,
         setInputText,
         currentPage,
        setCurrentPage
    };
  };