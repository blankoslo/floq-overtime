// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MediaQuery from 'react-responsive';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchEmployeesAndOvertime, saveOvertime, setCurrentEmployee } from '../actions';
import EmployeePicker from '../components/EmployeePicker';
import type { State } from '../types/Domain';
import { Employee, groupOvertimesByYear, Overtime, sortByName } from '../types/Domain';
import '../index.css';
import Main from '../components/Main';

export const DESKTOP_BREAKPOINT = 600;

type LocalState = {
  showAdmin: boolean;
}

type Props = {
  fetchEmployeesAndOvertime: Function;
  saveOvertime: Function;
  setCurrentEmployee: Function;
  employees: Array<Employee>;
  overtimes: Array<Overtime>;
  currentOvertimes: Array<Overtime>;
  currentEmployee: Employee;
  loggedInEmployee: Employee,
  isFetching: boolean;
  isSaving: boolean;
  showAdmin: boolean;
}

class App extends Component<void, Props, LocalState> {

  state: LocalState = {
    showAdmin: false,
  };

  componentWillMount() {
    this.props.fetchEmployeesAndOvertime();
  }

  render() {
    const employees = this.props.employees.sort(sortByName);
    const currentEmployee = this.props.currentEmployee;
    const currentOvertimes = this.props.overtimes.filter(x => x.employee === currentEmployee.id);
    const overtimeGroups = groupOvertimesByYear(currentOvertimes);
    const isAdmin = this.props.loggedInEmployee !== null &&
      this.props.loggedInEmployee.roles.includes('admin');

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
          <MediaQuery minWidth={DESKTOP_BREAKPOINT}>
            <ToolbarGroup>
              {isAdmin &&
              <RaisedButton
                onClick={this.toggleAdmin}
                label={this.state.showAdmin ? 'Hovedside' : 'Admin'}
                primary
                style={{ marginTop: 12 }}
              />
              }
            </ToolbarGroup>
          </MediaQuery>
        </Toolbar>
        <Main
          showAdmin={this.state.showAdmin}
          isSaving={this.props.isSaving}
          saveOvertime={this.props.saveOvertime}
          overtimeGroups={overtimeGroups}
          overtime={this.props.overtimes}
          employees={this.props.employees}
        />
      </div>
    );
  }

  toggleAdmin = () => {
    this.setState({ showAdmin: !this.state.showAdmin });
  };
}

const mapStateToProps = (state: State) => ({
  isFetching: state.isFetching,
  isSaving: state.isSaving,
  overtimes: state.overtimes,
  employees: state.employees,
  currentEmployee: state.currentEmployee,
  loggedInEmployee: state.loggedInEmployee
});

const mapDispatchToProps = (dispatch: *) => bindActionCreators({
  fetchEmployeesAndOvertime,
  setCurrentEmployee,
  saveOvertime,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
