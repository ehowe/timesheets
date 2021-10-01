export interface UserT {
  admin: boolean,
  email: string,
  first_name: string,
  id: number,
  last_name: string,
  locked: boolean,
  token: string,
  valid: boolean,
}

export interface ScheduleT {
  id: number,
  length_in_days: number,
  start_date: string,
  start_day: string,
  start_time: string,
  timezone: string,
}

export interface PayPeriodT {
  end: string,
  end_at: string,
  id: number,
  length_in_days: number,
  start: string,
  start_at: string,
}

export interface EntryT {
  category: string,
  end_at: string,
  id: number,
  length: string,
  length_in_hours: number,
  start_at: string,
}

export interface PayrollCategoryT {
  id: number,
  name: string,
}

export interface AdminTimesheetT extends EntryT {
  name: string,
}
