export type UserT = {
  admin: boolean,
  email: string,
  first_name: string,
  id: number,
  last_name: string,
  locked: boolean,
  token: string,
  valid: boolean,
}

export type ScheduleT = {
  id: number,
  length_in_days: number,
  start_date: string,
  start_day: string,
  start_time: string,
  timezone: string,
}

export type PayPeriodT = {
  end_at: string,
  id: number,
  start_at: string,
}
