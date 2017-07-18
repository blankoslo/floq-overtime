// @flow

import type { Action } from '../actions';
import type { State } from '../types/Domain';

const config = {
  userEmail: window.userEmail
};

const initialState: State = {
  isFetching: false,
  isSaving: false,
  overtimes: [],
  employees: [],
  currentEmployee: null,
  saveComplete: false,
  saveFailed: false,
  hours: 0,
  comment: ''
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'REQUEST_OVERTIME':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'REQUEST_EMPLOYEES':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'SET_CURRENT_EMPLOYEE':
      return Object.assign({}, state, {
        currentEmployee: state.employees.find(employee => employee.id === action.id)
      });
    case 'SET_COMMENT':
      return Object.assign({}, state, {
        comment: action.comment
      });
    case 'SET_HOURS':
      return Object.assign({}, state, {
        hours: action.hours
      });
    case 'SAVE_OVERTIME_STARTED':
      return Object.assign({}, state, {
        isSaving: true,
        saveFailed: false,
        saveComplete: false
      });
    case 'SAVE_OVERTIME_COMPLETED':
      return Object.assign({}, state, {
        isSaving: false,
        saveComplete: true,
        hours: 0,
        comment: '',
        overtimes: state.overtimes.concat(action.overtime)
      });
    case 'SAVE_OVERTIME_FAILED':
      return Object.assign({}, state, {
        isSaving: false,
        saveFailed: true
      });
    case 'RECEIVE_OVERTIME_AND_EMPLOYEES':
      return Object.assign({}, state, {
        employees: action.employees,
        overtimes: action.overtimes,
        currentEmployee: action.employees.find(x => config.userEmail === x.email)
      });
    default:
      return state;
  }
}
