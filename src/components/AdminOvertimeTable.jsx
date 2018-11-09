// @flow

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { OvertimeGroup, formatDate } from '../types/Domain';

type TableProps = {
  overtimeGroups: Array<OvertimeGroup>;
  employees: Array<Employee>
}

function mapEmployeeName(employeeId: number, employees: Array<Employee>) {
  const employee = employees.find(emp => emp.id === employeeId);
  return employee.first_name + " " + employee.last_name;
}

function buildTableBody(overtimeGroups: Array<OvertimeGroup>, employees: Array<Employee>) {
  const rows = [];
  overtimeGroups.forEach((group) => {
    rows.push(
      <TableRow key={`${group.year}`}>
        <TableHeaderColumn className='yearHeader' colSpan='5'>{group.year}</TableHeaderColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={`header-${group.year}`}>
        <TableHeaderColumn>Ansatt</TableHeaderColumn>
        <TableHeaderColumn>Registrert</TableHeaderColumn>
        <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
        <TableHeaderColumn>Timer</TableHeaderColumn>
        <TableHeaderColumn>Utbetalt dato</TableHeaderColumn>
      </TableRow>
    );
    group.overtimes.forEach((overtime, i) => {
      rows.push(<TableRow key={`${overtime.registered_date} ${i}`}>
        <TableRowColumn>{mapEmployeeName(overtime.employee, employees)}</TableRowColumn>
        <TableRowColumn className='registeredDate'>{formatDate(overtime.registered_date)}</TableRowColumn>
        <TableRowColumn>{overtime.comment}</TableRowColumn>
        <TableRowColumn>{overtime.minutes / 60}</TableRowColumn>
        <TableRowColumn>
          {overtime.paid_date !== null ? formatDate(overtime.paid_date) : 'IKKE UTBETALT'}
        </TableRowColumn>
      </TableRow>);
    });
  });

  return rows;
}

const AdminOvertimeTable = ({ overtimeGroups, employees }: TableProps) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} />
    <TableBody displayRowCheckbox={false}>
      {buildTableBody(overtimeGroups, employees)}
    </TableBody>
  </Table>
);

export default AdminOvertimeTable;
