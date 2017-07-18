// @flow

import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { Employee } from '../types/Domain';

type Props = {
  employees: Array<Employee>;
  currentEmployee: Employee;
  setCurrentEmployee: Function;
}

type Tuple = {
  value: string;
}

const EmployeePicker = ({ employees, currentEmployee, setCurrentEmployee }: Props) => {
  const employeeNames = employees
    .map(x => ({ text: `${x.first_name} ${x.last_name}`, value: x.id }));
  const handleSetEmployee = (tuple: Tuple) => {
    setCurrentEmployee(tuple.value);
  };

  return (<AutoComplete
    id='employee-selector-autocomplete'
    dataSource={employeeNames}
    filter={AutoComplete.fuzzyFilter}
    onNewRequest={handleSetEmployee}
    searchText={(`${currentEmployee.first_name} ${currentEmployee.last_name}`) || ''}
    openOnFocus
  />);
};

export default EmployeePicker;
