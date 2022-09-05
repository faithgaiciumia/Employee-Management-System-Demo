import React from 'react';
import EmployeeRow from './EmployeeRow';

export default function EmployeeTable(props) {
    let employeeRows = props.employees.map((employee) => (
      <EmployeeRow key={employee._id} employee={employee} updateEmployee={props.updateEmployee}
      deleteEmployee={props.deleteEmployee} />
    ));
    return (
      <div className="table-responsive">
        <table className="table m-3 table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Date of Joining</th>
              <th scope="col">Title</th>
              <th scope="col">Department</th>
              <th scope="col">Employee Type</th>
              <th scope="col">Current Status</th>
            </tr>
          </thead>
          <tbody>
          {employeeRows}
          </tbody>
        </table>
      </div>
    );
  }