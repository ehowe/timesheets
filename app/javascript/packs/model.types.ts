export type UserT = {
  admin: boolean,
  email: string | null,
  first_name: string | null,
  id: number | null,
  last_name: string | null,
  token: string | null,
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
