import axios from 'axios';
import React,{useState,useEffect } from 'react'; 
import { ipAddress } from './constants';
import ReactTable from "react-table"; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.defaults.baseURL = `http://${ipAddress}`;

const InformationPage = () => { 

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        (async () => {
            console.log('kezdete');
            const result = await axios('/api/topTen');
            console.log('kozepe');
            setIngredients(result.data);
            console.log('vege');
        })();
      }, []);

      const columns = [{  
        Header: 'ID',  
        accessor: 'COSING Ref No',
       }
       ,{  
        Header: 'Name',  
        accessor: 'INCI name' ,
        }
       
       ,{  
       Header: 'Username',  
       accessor: 'INN name' ,
       }
       ,{  
       Header: 'Phone',  
       accessor: 'Ph. Eur. Name',
       },
       {  
        Header: 'Email',  
        accessor: 'CAS No',
        },
        {  
        Header: 'Website',  
        accessor: 'EC No',
        },
        {  
        Header: 'Website2',  
        accessor: 'Chem/IUPAC Name / Description',
        },
        {  
        Header: 'Website3',  
        accessor: 'Restriction',
        },
        {  
        Header: 'Website4',  
        accessor: 'Function',
        },
        {  
        Header: 'Website5',  
        accessor: 'Update Date',
        }
    ]

    return ( 
        <div>
            <h1>Ingredients</h1>
          {/* <ReactTable 
        data={ingredients}  
        columns={columns}  
        /> */}
        </div>
    );  

  } 
  
  export default InformationPage; 