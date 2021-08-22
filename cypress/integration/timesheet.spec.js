import { login } from '../common/loginUtils'
import { createTimesheet } from '../common/timesheetUtils'

describe('Timesheets', () => {
  beforeEach(() => {
    login()
    cy.visit('/')
  })

  it('shows the empty state', () => {
    cy.get('.timesheetHeader').contains('No timesheets found').should('exist')
  })

  it('creates a timesheet', () => {
    let tdLength = Cypress.$('.sheet-name').length

    createTimesheet()

    cy.get('.sheet-name').should('have.length', tdLength + 1)
  })
})
