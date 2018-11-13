// @flow

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { OvertimeGroup, formatDate } from '../types/Domain';
import DatePicker from './DatePickerComponent';

type TableProps = {
  overtimeGroups: Array<OvertimeGroup>;
  employees: Array<Employee>;
  handleDateSave: Function;
}

function mapEmployeeName(employeeId: number, employees: Array<Employee>) {
  const employee = employees.find(emp => emp.id === employeeId);
  return employee.first_name + " " + employee.last_name;
}

function buildTableBody(overtimeGroups: Array<OvertimeGroup>, employees: Array<Employee>, handleDateSave: Function) {
  const rows = [];
  overtimeGroups.forEach((group) => {
    rows.push(
      <TableRow key={`${group.year}`}>
        <TableHeaderColumn className='yearHeader' colSpan='6'>{group.year}</TableHeaderColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={`header-${group.year}`}>
        <TableHeaderColumn>Ansatt</TableHeaderColumn>
        <TableHeaderColumn>Registrert</TableHeaderColumn>
        <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
        <TableHeaderColumn>Timer</TableHeaderColumn>
        <TableHeaderColumn>Utbetalt dato</TableHeaderColumn>
        <TableHeaderColumn />
      </TableRow>
    );
    group.overtimes.forEach((overtime, i) => {
      const employeeName = mapEmployeeName(overtime.employee, employees);
      rows.push(<TableRow key={`${overtime.registered_date} ${i}`}>
        <TableRowColumn>{employeeName}</TableRowColumn>
        <TableRowColumn className='registeredDate'>{formatDate(overtime.registered_date)}</TableRowColumn>
        <TableRowColumn>{overtime.comment}</TableRowColumn>
        <TableRowColumn>{overtime.minutes / 60}</TableRowColumn>
        <TableRowColumn>
          {overtime.paid_date !== null ? formatDate(overtime.paid_date) : 'IKKE UTBETALT'}
        </TableRowColumn>
        <TableRowColumn>
          <DatePicker handleDateSave={handleDateSave} overtime={overtime} employee={employeeName}/>
        </TableRowColumn>
      </TableRow>);
    });
  });

  return rows;
}

const AdminOvertimeTable = ({ overtimeGroups, employees, handleDateSave }: TableProps) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} />
    <TableBody displayRowCheckbox={false}>
      {buildTableBody(overtimeGroups, employees, handleDateSave)}
    </TableBody>
  </Table>
);

export default AdminOvertimeTable;
