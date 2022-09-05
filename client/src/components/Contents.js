import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EmployeeDetails from './EmployeeDetails.js';
import EmployeeDirectory from './EmployeeDirectory.js';
import EmployeeEdit from './EmployeeEdit.js';
import '../App.css'

const NotFound = () => <h2>Page Not Found</h2>;


export default function Contents() {
    return (
        <Routes>  
            <Route exact path="/" element={<EmployeeDirectory/>} />
            <Route path="/employees" element={<EmployeeDirectory/>} />             
            <Route path="/edit/:_id" element={<EmployeeEdit/>} />
            <Route path="/details/:_id" element={<EmployeeDetails/>} />
            <Route path="/*" element={<NotFound/>} />                      
        </Routes>
    );
}