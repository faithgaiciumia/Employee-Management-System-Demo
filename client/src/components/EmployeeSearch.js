import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
class EmployeeSearch extends React.Component {
    render() { 
        return (
            <div className='container p-3'>
                <a href="/employees">All Employees</a>
                {' | '}
                <a href="/employees?employeeType=full time">Full-time Employees</a>
                {' | '}
                <a href="/employees?employeeType=part time">Part-time Employees</a>
                {' | '}
                <a href="/employees?employeeType=contract">Contract Employees</a>
                {' | '}
                <a href="/employees?employeeType=seasonal">Seasonal Employees</a>
            </div>
        )
    }
}

export default EmployeeSearch;