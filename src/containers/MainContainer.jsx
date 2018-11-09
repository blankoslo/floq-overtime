// @flow

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MediaQuery from 'react-responsive';
import FontIcon from 'material-ui/FontIcon';
import OvertimeTable from '../components/OvertimeTable';
import MobileContainer from './MobileContainer';
import AddOvertimeContainer from './AddOvertimeContainer';
import { OvertimeGroup, Overtime, Employee } from '../types/Domain';
import AdminContainer from './AdminContainer';

export const DESKTOP_BREAKPOINT = 600;

type Props = {
  showAdmin: boolean;
  isSaving: boolean;
  saveOvertime: Function;
  overtimeGroups: OvertimeGroup[];
  overtime: Array<Overtime>;
  employees: Array<Employee>;
}

class MainContainer extends Component<void, Props, void> {

  render() {
    if (this.props.showAdmin) {
      return (
        <AdminContainer
          overtime={this.props.overtime}
          employees={this.props.employees}
        />
      );
    }

    return (
      <div>
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
            <OvertimeTable overtimeGroups={this.props.overtimeGroups} />
          </Paper>
        </MediaQuery>
        <MediaQuery maxWidth={DESKTOP_BREAKPOINT - 1}>
          <MobileContainer
            overtimeGroups={this.props.overtimeGroups}
            isSaving={this.props.isSaving}
            saveOvertime={this.props.saveOvertime}
          />
        </MediaQuery>
      </div>
    );
  }
}

export default MainContainer;