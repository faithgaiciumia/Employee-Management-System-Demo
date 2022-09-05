import React, { useEffect, useState } from "react";
import graphQLFetch from "./graphQLFetch.js";
import { useParams } from "react-router-dom";
import '../App.css';

export default function EmployeeDetails() {
    const { _id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = () => {
        const query = `
        mutation SingleEmployee($_id: String!) {
            SingleEmployee(_id: $_id) {
                _id
                id     
                firstName
                lastName
                age
                dateOfJoining
                title
                department
                employeeType
                currentStatus
            } 
        }`;
        graphQLFetch(query, { _id }).then(function (data) {
            setEmployee(data.SingleEmployee);
        });
    };
    
    return (
        <div className="card mx-auto mt-3 p-3">            
            <div className="card-body">
                <div className="d-flex">
                <h2>First Name: </h2> <h2>{employee.firstName}</h2>
                </div>
                <div className="d-flex">
                <h2>Last Name: </h2> <h2>{employee.lastName}</h2>
                </div>
                <div className="d-flex">
                <h2>Age: </h2> <h2>{employee.age}</h2>
                </div>
                <div className="d-flex">
                <h2>Date of Joining: </h2> <h2>{employee.dateOfJoining}</h2>
                </div>
                <div className="d-flex">
                <h2>Title: </h2> <h2>{employee.title}</h2>
                </div>
                <div className="d-flex">
                <h2>Department: </h2> <h2>{employee.department}</h2>
                </div>
                <div className="d-flex">
                <h2>Employee Type: </h2> <h2>{employee.employeeType}</h2>
                </div>
            </div>
        </div>
    );
}
