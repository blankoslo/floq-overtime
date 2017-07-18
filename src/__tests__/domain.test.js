import { groupOvertimesByYear } from '../types/Domain';

const overtime2017One = {
  comment: 'comment',
  minutes: 60,
  paid_date: '2017-01-01',
  registered_date: '2017-01-01',
  employee: {}
};

const overtime2017Two = {
  comment: 'commentTwo',
  minutes: 120,
  paid_date: '2017-03-03',
  registered_date: '2017-04-04',
  employee: {}
};

const overtime2016 = {
  comment: 'commentThree',
  minutes: 80,
  paid_date: '2016-02-03',
  registered_date: '2016-05-04',
  employee: {}
};

describe('groupOvertimesByYear', () => {
  it('should return empty list if no overtimes', () => {
    expect(groupOvertimesByYear([])).toEqual([]);
  });

  it('should return correct structure if 1 overtime', () => {
    expect(groupOvertimesByYear([overtime2017One])).toEqual(
      [{ year: 2017, overtimes: [overtime2017One] }]);
  });

  it('should group years correctly', () => {
    expect(groupOvertimesByYear([overtime2017One, overtime2017Two, overtime2016])).toEqual(
      [
        { year: 2017, overtimes: [overtime2017Two, overtime2017One] },
        { year: 2016, overtimes: [overtime2016] }
      ]);
  });
});
