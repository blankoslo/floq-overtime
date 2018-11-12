// @flow

import * as api from '../apiclient';
import type { State } from '../types/Domain';
import { Overtime } from '../types/Domain';

type RequestOvertimeAction = { type: 'REQUEST_OVERTIME'; }
type ReceiveOvertimeAction = { type: 'RECEIVE_OVERTIME'; overtimes: JSON; }
type RequestEmployeesAction = { type: 'REQUEST_EMPLOYEES'; }
type ReceiveEmployeesAction = { type: 'RECEIVE_EMPLOYEES'; employees: JSON; }
type SetCurrentEmployeeAction = { type: 'SET_CURRENT_EMPLOYEE'; id: string; }
type SetHoursAction = { type: 'SET_HOURS'; hours: number; }
type SetCommentAction = { type: 'SET_COMMENT'; comment: string; }
type SaveOvertimeStartedAction = { type: 'SAVE_OVERTIME_STARTED' }
type SaveOvertimeCompletedAction = { type: 'SAVE_OVERTIME_COMPLETED'; overtime: ?Overtime }
type SaveOvertimeFailedAction = { type: 'SAVE_OVERTIME_FAILED';}
type ReceiveOvertimeAndEmployeesAction = {
  type: 'RECEIVE_OVERTIME_AND_EMPLOYEES';
  overtimes: JSON;
  employees: JSON;
}
type savePaidDateCompletedAction = { type: 'SAVE_PAID_DATE_COMPLETED'; overtime: Overtime[] }
type savePaidDateFailedAction = { type: 'SAVE_PAID_DATE_FAILED'; }

export type Action =
  | RequestOvertimeAction
  | ReceiveOvertimeAction
  | RequestEmployeesAction
  | ReceiveEmployeesAction
  | SetCurrentEmployeeAction
  | SetHoursAction
  | SetCommentAction
  | SaveOvertimeStartedAction
  | SaveOvertimeCompletedAction
  | SaveOvertimeFailedAction
  | ReceiveOvertimeAndEmployeesAction
  | savePaidDateCompletedAction
  | savePaidDateFailedAction;

export function requestEmployees(): RequestEmployeesAction {
  return { type: 'REQUEST_EMPLOYEES' };
}

export function receiveEmployees(employees: JSON): ReceiveEmployeesAction {
  return { type: 'RECEIVE_EMPLOYEES', employees };
}

export function requestOvertime(): RequestOvertimeAction {
  return { type: 'REQUEST_OVERTIME' };
}

export function receiveOvertime(overtimes: JSON): ReceiveOvertimeAction {
  return { type: 'RECEIVE_OVERTIME', overtimes };
}

export function receiveOvertimeAndEmployees(
  overtimes: JSON, employees: JSON): ReceiveOvertimeAndEmployeesAction {
  return { type: 'RECEIVE_OVERTIME_AND_EMPLOYEES', overtimes, employees };
}

export function setCurrentEmployee(id: string): SetCurrentEmployeeAction {
  return { type: 'SET_CURRENT_EMPLOYEE', id };
}

export function setHours(hours: number): SetHoursAction {
  return { type: 'SET_HOURS', hours };
}

export function setComment(comment: string): SetCommentAction {
  return { type: 'SET_COMMENT', comment };
}

export function saveStarted(): SaveOvertimeStartedAction {
  return { type: 'SAVE_OVERTIME_STARTED' };
}

export function saveOvertimeCompleted(overtime: ?Overtime): SaveOvertimeCompletedAction {
  return { type: 'SAVE_OVERTIME_COMPLETED', overtime };
}

export function saveOvertimeFailed(): SaveOvertimeFailedAction {
  return { type: 'SAVE_OVERTIME_FAILED' };
}

export function savePaidDateCompleted(overtime: Overtime[]): savePaidDateCompletedAction {
  return { type: 'SAVE_PAID_DATE_COMPLETED', overtime};
}

export function savePaidDateFailed(): savePaidDateFailedAction {
  return { type: 'SAVE_PAID_DATE_FAILED' };
}

function getOvertime() {
  return dispatch =>
    api.fetchOvertime().then(
      json => dispatch(receiveOvertime(json)),
      err => dispatch({ type: 'SOMETHING_FAILED', err })
    );
}

function getEmployees() {
  return dispatch =>
    api.fetchEmployees().then(
      json => dispatch(receiveEmployees(json)),
      err => dispatch({ type: 'SOMETHING_FAILED', err })
    );
}

export const saveOvertime = (minutes: number, comment: string) =>
  (dispatch: Function, getState: Function) => {
    const state: State = getState();
    dispatch(saveStarted());
    const body = { employee: state.currentEmployee.id, minutes, comment };
    api.addOvertime(body).then(
      (json: Overtime) => {
        dispatch(saveOvertimeCompleted(json));
        dispatch(getOvertime());
      }
    ).catch(() => {
      dispatch(saveOvertimeFailed());
    });
  };

export const fetchEmployeesAndOvertime = () => (dispatch: Function) => {
  dispatch(requestOvertime());
  Promise.all([
    dispatch(getOvertime()),
    dispatch(getEmployees())
  ]).then(
    ([overtimeAction, employeeAction]: [ReceiveOvertimeAction, ReceiveEmployeesAction]) => {
      dispatch(receiveOvertimeAndEmployees(overtimeAction.overtimes, employeeAction.employees));
    },
    err => dispatch({ type: 'SOMETHING_FAILED', err })
  );
};

export const updatePaidDate = (id: number, paid_date: string) =>
  (dispatch: Function) => {
    api.changePaidDate(id, paid_date).then(
      (json: Overtime[]) => {
        dispatch(savePaidDateCompleted(json));
      }
    ).catch(() => {
      dispatch(savePaidDateFailed());
    });
  };