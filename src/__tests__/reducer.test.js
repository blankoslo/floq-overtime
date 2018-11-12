import { setCurrentEmployee } from '../actions';
import reducer from '../reducers';

describe('set current employee reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isFetching: false,
        isSaving: false,
        overtimes: [],
        employees: [],
        currentEmployee: null,
        saveComplete: false,
        saveFailed: false,
        hours: 0,
        comment: '',
        savePaidDateFailed: false,
        savePaidDateCompleted: false,
      }
    );
  });

  it('should handle SET_CURRENT_EMPLOYEE', () => {
    expect(
      reducer(
        {
          overtimes: [],
          currentOvertimes: [],
          employees: [{ id: '1', first_name: 'rolf' }, { id: '2', first_name: 'ane' }],
          currentEmployee: null
        }, setCurrentEmployee('1')
      )
    ).toEqual({
      overtimes: [],
      currentOvertimes: [],
      employees: [{ id: '1', first_name: 'rolf' }, { id: '2', first_name: 'ane' }],
      currentEmployee: { id: '1', first_name: 'rolf' }
    });
  });
});
