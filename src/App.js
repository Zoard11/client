
import React,{Component} from 'react'; 
import {Route} from 'react-router-dom';
import InformationPage from './informationPage';
import UploadPage from './uploadPage';
import NavBar from './navbar';
import {BrowserRouter,Routes } from 'react-router-dom';


class App extends Component { 
  
    render() { 
      return ( 
        <div className='App '> 
        <BrowserRouter>
          <NavBar/>

          <Routes >
            <Route exact path ='/' element={<InformationPage/>}/>
            <Route exact path ='/upload' element={<UploadPage/>}/>
          </Routes >
        </BrowserRouter>
        </div> 
      );  
    } 
  } 
  
  export default App; 