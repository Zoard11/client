import axios from 'axios';
import React,{Component} from 'react'; 
import { ipAddress } from './constants';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.defaults.baseURL = `http://${ipAddress}`;


class UploadPage extends Component { 

    state = { 
  
      selectedFile: null
    }; 
     

    onFileChange = event => { 
      this.setState({ selectedFile: event.target.files[0] }); 
    };  
     
    onFileUpload = () => { 
      const formData = new FormData(); 
     
      formData.append( 
        "file", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      console.log(this.state.selectedFile); 
     
      console.log(axios.defaults.baseURL);
      axios.post('/api/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } 
     }); 

    }; 
     
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 
     
    render() { 
      return ( 
        <div> 
            <h1> 
              Cosmetics database 
            </h1> 
            <h3> 
              Upload a csv file! 
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
          {this.fileData()} 
        </div> 
      ); 
    } 
  } 
  
  export default UploadPage; 