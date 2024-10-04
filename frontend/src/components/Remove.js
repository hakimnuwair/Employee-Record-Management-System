import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "./styles/Form.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

export default function Remove() {
  
  const [ref, setRef] = useState('');

  const handleChange = (e) => {
    setRef(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      
      try {
        const response = await axios.delete(`http://localhost:3001/member/removemember/${ref}`);
        const {name} = response.data;
        toast.success(`Member ${name} removed Successfully`);
      } catch (error) {
        toast.error("Member Not Found");
        console.log("error",error);
      }finally{
        setTimeout(() => {
          setRef('');
      }, 5000);
      }
    }

  return (
    <div><Header />
    <div className="form-container">
            <h2>Offerletter Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter Ref ID:</label>
                    <input
                        type="text"
                        id="ref"
                        name="ref"
                        value={ref}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer position="top-right" />
        </div>
        </div>
  );
};
