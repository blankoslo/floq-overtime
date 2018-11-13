// @flow

import React, { Component } from 'react';
import type { State } from '../types/Domain';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/FlatButton';
import { Overtime } from '../types/Domain';

type LocalState = {
  controlledDate: any;
  modalOpen: boolean;
}

type Props = {
  handleDateSave: Function;
  overtime: Overtime;
  employee: string;
}

export default class DatePickerComponent extends Component<void, Props, LocalState> {

  state: LocalState = {
    controlledDate: this.props.overtime.paid_date ? new Date(this.props.overtime.paid_date) : null,
    modalOpen: false,
  }

  render() {
    return (
      <div>
        <Button
          label='Endre dato'
          primary={true}
          onClick={this.openModal}
        />
        <Dialog
          title='Endre dato utbetalt'
          actions={[
            <Button
              label='Cancel'
              primary={true}
              onClick={this.closeModal}
            />,
            <Button
              label='Lagre'
              primary={true}
              onClick={this.saveNewDate}
            />
          ]}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.closeModal}
        >
        <div><b>Ansatt:</b> {this.props.employee}</div>
        <div><b>Registrert dato:</b> {this.props.overtime.registered_date}</div>
        <div>{(this.props.overtime.minutes / 60)} timer til {this.props.overtime.comment} </div>
        <br/>
        <div><b>Utbetalt dato:</b></div>
          <DatePicker
            value={this.state.controlledDate}
            onChange={this.handleDateChange}
            hintText='XXXX-XX-XX'
            container='inline'
            autoOk={true} />
        </Dialog>
      </div >
    );
  }

  handleDateChange = (event, date) => {
    this.setState({controlledDate: date});
  }

  saveNewDate = () => {
    this.closeModal();
    this.props.handleDateSave(this.props.overtime.id, this.state.controlledDate);
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }
}