import React,{useState } from 'react'; 
import { useBetween } from 'use-between';
import {useShareableState} from './UseBetween';

const InformationSearch = () => {

    const { inputText, setInputText,setCurrentPage} = useBetween(useShareableState);

    let inputHandler = (e) => {

        setInputText(e);
        setCurrentPage(1);
    };
    

  return (
    <div className="input-group rounded">
    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(event) => {
            inputHandler(event.target.value);
          }}/>
   
    </div>
  );
};

export default InformationSearch;
