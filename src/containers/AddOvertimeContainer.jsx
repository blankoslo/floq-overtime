// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { State } from '../types/Domain';
import { saveOvertime, setHours, setComment } from '../actions';

import AddOvertimeView from '../components/AddOvertimeView';
import '../index.css';

type LocalState = {
  hoursError: ?string;
  commentError: ?string;
}

type Props = {
  saveOvertime: Function;
  setHours: Function;
  setComment: Function;
  isSaving: boolean;
  saveComplete: boolean;
  saveFailed: boolean;
  hours: number;
  comment: string;
}

class AddOvertimeContainer extends Component<void, Props, LocalState> {
  state: LocalState = {
    hoursError: null,
    commentError: null
  }

  hoursChange = ({ target }: SyntheticInputEvent) => {
    this.props.setHours(Number.parseFloat(target.value));
  }

  commentChange = ({ target }: SyntheticInputEvent) => {
    this.props.setComment(target.value);
  }

  saveOvertime = () => {
    if (this.props.hours <= 0) {
      this.setState({ hoursError: 'Har du skrevet et positivt tall? 🙄' });
    } else {
      this.setState({ hoursError: null });
      if (this.props.comment === '') {
        this.setState({ commentError: 'Har du skrevet hvorfor du har jobbet overtid?' });
      } else {
        this.setState({ commentError: null });
        if (this.state.commentError === null && this.state.hoursError === null) {
          this.props.saveOvertime(this.props.hours * 60, this.props.comment);
        }
      }
    }
  }

  render() {
    return (
      <AddOvertimeView
        hours={this.props.hours}
        comment={this.props.comment}
        isSaving={this.props.isSaving}
        saveOvertime={this.saveOvertime}
        hoursChange={this.hoursChange}
        commentChange={this.commentChange}
        hoursError={this.state.hoursError}
        commentError={this.state.commentError}
        savedMessage='Yess! Ting ble registrert, kvinne/mann! 💫'
        savedComplete={this.props.saveComplete}
        saveFailed={this.props.saveFailed}
      />
    );
  }
}

const mapStateToProps = (state: State) => ({
  isSaving: state.isSaving,
  saveComplete: state.saveComplete,
  saveFailed: state.saveFailed,
  hours: state.hours,
  comment: state.comment
});

const mapDispatchToProps = (dispatch: *) => bindActionCreators({
  saveOvertime,
  setHours,
  setComment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddOvertimeContainer);
