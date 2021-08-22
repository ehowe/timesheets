import { login } from '../common/loginUtils'
import { createTimesheet } from '../common/timesheetUtils'
import { createTimesheetEntry } from '../common/timesheetEntryUtils'

describe('Timesheet Entries', () => {
  beforeEach(() => {
    login()
    createTimesheet()
    cy.get('.sheet-name').last().find('a').click()
  })

  it('shows the empty state', () => {
    cy.get('.timesheetHeader').contains('No Entries in this Timesheet').should('be.visible')
  })

  it.only('creates a new timesheet entry', () => {
    createTimesheetEntry({})
  })
})
