import React from 'react';
import {    
  Link
} from "react-router-dom";
export default function EmployeeRow(props) {
    let employee = props.employee; 
    return (
      <tr>      
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.age}</td>
        <td>{employee.dateOfJoining.toString()}</td>
        <td>{employee.title}</td>
        <td>{employee.department}</td>
        <td>{employee.employeeType}</td>
        <td>{employee.currentStatus = "1"}</td>
        <td><Link className='btn btn-warning' to={`/edit/${employee._id}`}>Edit</Link></td>
        <td><Link className='btn btn-primary' to={`/details/${employee._id}`}>View Details</Link></td>
        <td><button className='btn btn-danger' onClick={() => props.deleteEmployee(props.employee._id)}>Delete</button></td>
      </tr> 
    );
  }