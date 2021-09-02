import { login } from '../common/loginUtils'
import { createTimesheet } from '../common/timesheetUtils'
import { clickNewEntryButton, clickStartDate, createTimesheetEntry } from '../common/timesheetEntryUtils'

import * as dateFns from 'date-fns'

describe('Timesheet Entries', () => {
  beforeEach(() => {
    login()
    createTimesheet()
    cy.get('.sheet-name').last().find('a').click()
  })

  it('shows the empty state', () => {
    cy.get('.timesheetHeader').contains('No Entries in this Timesheet').should('be.visible')
  })

  it('creates a new timesheet entry', () => {
    createTimesheetEntry({})
  })

  it('has dates disabled that are not in the pay period', () => {
    clickNewEntryButton()
    clickStartDate()

    const todayDate = new Date()
    const prevDate = new Date()

    prevDate.setMonth(todayDate.getMonth() - 1)
    prevDate.setDate(1)

    const today = dateFns.format(todayDate, 'MMMM d, yyyy')
    const prevSelector = dateFns.format(prevDate, 'MMMM d, yyyy')

    cy.get('.start-date').find(`[aria-label="${today}"]`).parent().should('not.be.disabled')
    cy.get('.react-calendar__navigation__prev-button').click()
    cy.get('.start-date').find(`[aria-label="${prevSelector}"]`).parent().should('be.disabled')
  })
})
