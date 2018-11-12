// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { State } from '../types/Domain';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AdminOvertimeTable from '../components/AdminOvertimeTable';
import Button from 'material-ui/RaisedButton';
import { groupOvertimesByYear, filterPaidOutOvertimes, Overtime, Employee } from '../types/Domain';

export const DESKTOP_BREAKPOINT = 600;

type LocalState = {
  showAllOvertime: boolean;
}

type Props = {
  overtime: Array<Overtime>;
  employees: Array<Employee>
}

class Admin extends Component<void, Props, LocalState> {

  state: LocalState = {
    showAllOvertime: false,
  }

  render() {

    const overtimes = this.state.showAllOvertime ?
      this.props.overtime : filterPaidOutOvertimes(this.props.overtime);
    const overtimeGroups = groupOvertimesByYear(overtimes);

    return (
      <Paper className='adminWrapper'>
        <AppBar
          title='Registrerte fraværstimer'
          iconElementLeft={<IconButton><FontIcon className='material-icons'>list</FontIcon></IconButton>}>
          <div>
          <Button
            onClick={this.toggleAbsence}
            label={this.state.showAllOvertime ? 'Vis kun ikke utbetalt fravær' : 'Vis alt fravær'}
            default
            style={{ margin: 10 }}
          />
          </div>
        </AppBar>
        <AdminOvertimeTable
          overtimeGroups={overtimeGroups}
          employees={this.props.employees}
          handleDateSave={this.handleDateSave}
        />
      </Paper>
    );
  }

  toggleAbsence = () => {
    this.setState({ showAllOvertime: this.state.showAllOvertime ? false : true });
  }

  handleDateSave = (date : Date) => {
    
  };
}

const mapStateToProps = (state: State) => ({

});

const mapDispatchToProps = (dispatch: *) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);