// @flow

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

type Props = {
  saveOvertime: Function;
  commentChange: Function;
  hoursChange: Function;
  isSaving: boolean;
  comment: string;
  hours: number;
  hoursError: ?string;
  commentError: ?string;
  savedComplete: boolean;
  saveFailed: boolean;
  savedMessage: string;
}

const AddOvertimeView =
  ({ saveOvertime, isSaving, comment, hours, commentChange, hoursChange,
    hoursError, commentError, savedComplete, savedMessage, saveFailed }: Props) =>
    (<div className='registerWrapper'>
      <TextField
        defaultValue={new Date().toLocaleDateString()}
        floatingLabelText='Registreringsdato'
        disabled
        style={{ width: '100%' }}
      /><br />
      <TextField
        floatingLabelText='Antall timer'
        onChange={hoursChange}
        value={hours > 0 ? hours : ''}
        type='number'
        errorText={hoursError}
        style={{ width: '100%' }}
      /><br />
      <TextField
        hintText='F.eks. "Overtidsarbeid, E Corp"'
        floatingLabelText='Beskrivelse'
        onChange={commentChange}
        value={comment}
        errorText={commentError}
        style={{ width: '100%' }}
      /><br />
      <RaisedButton
        className={saveFailed ? 'buttonError' : null}
        disabled={isSaving}
        label='Registrer overtid'
        errorText='Lol'
        onClick={saveOvertime}
        primary
        style={{ marginTop: 24 }}
      />
      {saveFailed ? <div style={{ marginTop: 12, color: 'red' }}>Noe feilet <span role='img' aria-label='arms-out'>🤷‍</span></div> : null }
      {isSaving ? <CircularProgress size={30} style={{ marginLeft: 12 }} /> : null}
      <Snackbar
        open={savedComplete}
        message={savedMessage}
        autoHideDuration={4000}
      />
    </div>);

export default AddOvertimeView;
