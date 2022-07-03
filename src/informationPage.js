import axios from 'axios';
import React,{useState,useEffect } from 'react'; 
import { ipAddress } from './constants';
import Table from "./Table";
import { InterfaceInci } from "./Types";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.defaults.baseURL = `http://${ipAddress}`;

const InformationPage = () => { 

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        (async () => {
            console.log('kezdete');
            const result = await axios.get('/api/topTen');
            console.log('kozepe');
            setIngredients(result.data);
            console.log(result.data);
            console.log('vege');
        })();
      }, []);

      

    return ( 
        <div>
            <h1>Ingredients</h1>
            <Table data={ingredients} />
        </div>
    );  

  } 
  
  export default InformationPage; 