import React, { useEffect, useState } from "react";
import graphQLFetch from "./graphQLFetch.js";
import { useParams } from "react-router-dom";

export default function EmployeeEdit() {
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
    const updateEmployee = (e) => {
        e.preventDefault();
        const form = document.forms.editEmployee; 
        let input = {            
            title: form.title.value,
            department: form.department.value,
            currentStatus: form.currentStatus.value,
          };
        setEmployee(input);        
        const query = `
              mutation updateEmployee($employee: EmployeeUpdatePayload) {
                      updateEmployee(employee: $employee) {                        
                          title
                          department 
                          currentStatus                                                  
                      } 
              }`;
        graphQLFetch(query, { employee }).then(function (data) {
                console.log(data);
        });
        form.title.value = "";
        form.department.value = "";
        form.currentStatus.value = "";
        
    };

    return (
        <div>            
            <form name="editEmployee" className="mx-auto mt-3 p-3" onSubmit={updateEmployee}>
                <h2>Update Employee Details</h2>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    className="m-3"
                    placeholder="Title"
                    value={employee.title}
                />
                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    className="m-3"
                    placeholder="Department"
                    value={employee.department}
                />
                <label>Current Status:</label>
                <input
                    type="number"
                    className="m-3"
                    name="currentStatus"
                    placeholder="Current Status"
                    value={employee.currentStatus}
                />                
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
