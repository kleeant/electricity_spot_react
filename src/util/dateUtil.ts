
import * as datefns from 'date-fns'

export const getStartOfDay = (date: Date = new Date()): Date => {
  return datefns.startOfDay(date)
}

export const getEndOfDay = (date: Date = new Date()): Date => {
  return datefns.endOfDay(date)
}

export const removeDays = (days: number, date: Date = new Date()): Date => {
  return datefns.subDays(date, days)
}

export const addDays = (days: number, date: Date = new Date()): Date => {
  return datefns.addDays(date, days)
}

export const addHours = (hours: number, date: Date = new Date()): Date => {
  return datefns.addHours(date, hours)
}
