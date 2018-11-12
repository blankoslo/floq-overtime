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
import Snackbar from 'material-ui/Snackbar';
import { groupOvertimesByYear, filterPaidOutOvertimes, Overtime, Employee } from '../types/Domain';
import { updatePaidDate } from '../actions';

export const DESKTOP_BREAKPOINT = 600;

type LocalState = {
  showAllOvertime: boolean;
}

type Props = {
  overtime: Array<Overtime>;
  employees: Array<Employee>;
  updatePaidDate: Function;
  savePaidDateFailed: boolean;
  savePaidDateCompleted: boolean;
}

class Admin extends Component<void, Props, LocalState> {

  state: LocalState = {
    showAllOvertime: false,
  }

  render() {

    let saveMessage = '';
    if (this.props.savePaidDateCompleted) {
      saveMessage = 'Utbetalt dato oppdatert ✨';
    }
    else if (this.props.savePaidDateFailed) {
      saveMessage = 'Hmm.. Noe gikk galt under oppdatering av utbetalt dato 🤔';
    }

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
        <Snackbar
          open={this.props.savePaidDateCompleted || this.props.savePaidDateFailed}
          message={saveMessage}
          autoHideDuration={4000}
        />
      </Paper>
    );
  }

  toggleAbsence = () => {
    this.setState({ showAllOvertime: this.state.showAllOvertime ? false : true });
  }

  handleDateSave = (id: number, paid_date: Date) => {
    const datestring = paid_date.getFullYear() + '-' + (paid_date.getMonth() + 1) + "-" + paid_date.getDate();
    this.props.updatePaidDate(id, datestring);
  };
}

const mapStateToProps = (state: State) => ({
  savePaidDateFailed: state.savePaidDateFailed,
  savePaidDateCompleted: state.savePaidDateCompleted,
});

const mapDispatchToProps = (dispatch: *) => bindActionCreators({
  updatePaidDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);