import * as dateFns from 'date-fns'

export const clickNewEntryButton = () => {
  cy.get('button').contains('Create new entry').click()
}

export const clickStartDate = () => {
  cy.get('.start-date').click()
}

export const createTimesheetEntry = (props) => {
  const {
    payrollCategory = 'Test category',
  } = props

  const todayDate = new Date()
  const today = dateFns.format(todayDate, 'MMMM d, yyyy')

  clickNewEntryButton()
  clickStartDate()
  cy.get('.start-date').find(`[aria-label="${today}"]`).click()
  cy.get('.end-date').click()
  cy.get('.end-date').find(`[aria-label="${today}"]`).click()
  cy.get('.start-time').find('.react-time-picker__inputGroup__hour').type('7')
  cy.get('.start-time').find('.react-time-picker__inputGroup__minute').type('00')
  cy.get('.start-time').find('.react-time-picker__inputGroup__amPm').select('am')
  cy.get('.start-time').parent().click()
  cy.get('.end-time').find('.react-time-picker__inputGroup__hour').type('5')
  cy.get('.end-time').find('.react-time-picker__inputGroup__minute').type('00')
  cy.get('.end-time').find('.react-time-picker__inputGroup__amPm').select('pm')
  cy.get('.end-time').parent().click()

  cy.get('[name=payroll_category_id]').select(payrollCategory)

  cy.get('.modal-dialog').find('button').contains('Submit').click()
}
