// @flow

export class Employee {
    id: string;
    first_name: string;
    last_name: string;
}

export class Overtime {
    comment: string;
    minutes: number;
    paid_date: string;
    registered_date: string;
    employee: number;
}

export class OvertimeGroup {
    year: number;
    overtimes: Array<Overtime>;
}

export type State = {
  isFetching: boolean;
  isSaving: boolean;
  overtimes: Array<Overtime>;
  employees: Array<Employee>;
  currentEmployee: ?Employee;
  saveComplete: boolean;
  saveFailed: boolean;
  comment: string;
  hours: number;
}

export function sortByName(a: Employee, b: Employee) {
  if (a.first_name < b.first_name) return -1;
  if (a.first_name > b.first_name) return 1;
  return 0;
}

export function sortByDate(a: Overtime, b: Overtime) {
  if (a.registered_date < b.registered_date) return 1;
  if (a.registered_date > b.registered_date) return -1;
  return 0;
}

export function groupOvertimesByYear(overtimes: Array<Overtime>) {
  const overtimesSortedByDate = overtimes.sort(sortByDate);
  const groupedOvertimes = overtimesSortedByDate.reduce(
    (acc: Array<OvertimeGroup>, item: Overtime) => {
      const year = new Date(item.registered_date).getFullYear();
      const existingGroup = acc.find(group => group.year === year);

      if (existingGroup === undefined) {
        acc.push({ year, overtimes: [item] });
      } else {
        existingGroup.overtimes.push(item);
      }
      return acc;
    }, []);
  return groupedOvertimes;
}

