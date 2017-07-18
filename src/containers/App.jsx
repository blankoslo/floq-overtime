// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MediaQuery from 'react-responsive';
import FontIcon from 'material-ui/FontIcon';
import { fetchEmployeesAndOvertime, setCurrentEmployee, saveOvertime } from '../actions';
import OvertimeTable from '../components/OvertimeTable';
import EmployeePicker from '../components/EmployeePicker';
import MobileContainer from './MobileContainer';
import AddOvertimeContainer from './AddOvertimeContainer';
import type { State } from '../types/Domain';
import { Employee, Overtime, groupOvertimesByYear, sortByName } from '../types/Domain';
import '../index.css';

export const DESKTOP_BREAKPOINT = 600;

type Props = {
  fetchEmployeesAndOvertime: Function;
  saveOvertime: Function;
  setCurrentEmployee: Function;
  employees: Array<Employee>;
  overtimes: Array<Overtime>;
  currentOvertimes: Array<Overtime>;
  currentEmployee: Employee;
  isFetching: boolean;
  isSaving: boolean;
}

class App extends Component<void, Props, void> {
  componentWillMount() {
    this.props.fetchEmployeesAndOvertime();
  }

  render() {
    const employees = this.props.employees.sort(sortByName);
    const currentEmployee = this.props.currentEmployee;
    const currentOvertimes = this.props.overtimes.filter(x => x.employee === currentEmployee.id);
    const overtimeGroups = groupOvertimesByYear(currentOvertimes);

    return (
      <div id='outer'>
        <Toolbar id='toolbar'>
          <ToolbarGroup>
            {currentEmployee ? <EmployeePicker
              employees={employees}
              currentEmployee={currentEmployee}
              setCurrentEmployee={this.props.setCurrentEmployee}
            /> : null}
          </ToolbarGroup>
        </Toolbar>
        <MediaQuery minWidth={DESKTOP_BREAKPOINT} className='desktopView'>
          <Paper className='addOvertimeWrapper'>
            <AppBar
              title='Registrer overtid'
              iconElementLeft={<IconButton><FontIcon className='material-icons'>note_add</FontIcon></IconButton>}
            />
            <AddOvertimeContainer
              isSaving={this.props.isSaving}
              saveOvertime={this.props.saveOvertime}
            />
          </Paper>
          <Paper className='tableWrapper'>
            <AppBar
              title='Oversikt'
              iconElementLeft={<IconButton><FontIcon className='material-icons'>list</FontIcon></IconButton>}
            />
            <OvertimeTable overtimeGroups={overtimeGroups} />
          </Paper>
        </MediaQuery>
        <MediaQuery maxWidth={DESKTOP_BREAKPOINT - 1}>
          <MobileContainer
            overtimeGroups={overtimeGroups}
            isSaving={this.props.isSaving}
            saveOvertime={saveOvertime}
          />
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  isFetching: state.isFetching,
  isSaving: state.isSaving,
  overtimes: state.overtimes,
  employees: state.employees,
  currentEmployee: state.currentEmployee
});

const mapDispatchToProps = (dispatch: *) => bindActionCreators({
  fetchEmployeesAndOvertime,
  setCurrentEmployee,
  saveOvertime,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
