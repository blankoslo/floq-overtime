// @flow

import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MediaQuery from 'react-responsive';
import { DESKTOP_BREAKPOINT } from '../containers/App';
import { OvertimeGroup } from '../types/Domain';

type TableProps = {
  overtimeGroups: Array<OvertimeGroup>;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('nb-no', options);
}

function buildTableBody(overtimeGroups: Array<OvertimeGroup>) {
  const rows = [];
  overtimeGroups.forEach((group) => {
    rows.push(
      <TableRow key={`${group.year} ${group.overtimes[0].employee}`}>
        <TableHeaderColumn className='yearHeader' colSpan='4'>{group.year}</TableHeaderColumn>
      </TableRow>
    );
    rows.push(
      <TableRow key={`header-${group.year} ${group.overtimes[0].employee}`}>
        <TableHeaderColumn>Registrert</TableHeaderColumn>
        <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
        <TableHeaderColumn>Timer</TableHeaderColumn>
        <TableHeaderColumn>Utbetalt</TableHeaderColumn>
      </TableRow>
    );
    group.overtimes.forEach((overtime, i) => {
      console.log(overtime.paid_date);
      rows.push(<TableRow key={`${overtime.employee} ${overtime.registered_date} ${i}`}>
        <TableRowColumn className='registeredDate'>{formatDate(overtime.registered_date)}</TableRowColumn>
        <TableRowColumn>{overtime.comment}</TableRowColumn>
        <TableRowColumn>{overtime.minutes / 60}</TableRowColumn>
        <MediaQuery maxWidth={DESKTOP_BREAKPOINT - 1}>
          <TableRowColumn>
            {overtime.paid_date !== null ? '✅' : ''}
          </TableRowColumn>
        </MediaQuery>
        <MediaQuery minWidth={DESKTOP_BREAKPOINT}>
          <TableRowColumn>
            {overtime.paid_date !== null ? formatDate(overtime.paid_date) : ''}
          </TableRowColumn>
        </MediaQuery> 
      </TableRow>);
    });
  });

  if (rows.length === 0) {
    rows.push(<TableRow>
      <TableRowColumn>Du har INGEN registrerte overtidstimer.</TableRowColumn>
        </TableRow>);
  }

  return rows;
}

const OvertimeTable = ({ overtimeGroups }: TableProps) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} />
    <TableBody displayRowCheckbox={false}>
      {buildTableBody(overtimeGroups)}
    </TableBody>
  </Table>
);

export default OvertimeTable;
