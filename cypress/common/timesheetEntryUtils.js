export const createTimesheetEntry = (props) => {
  const {
    payrollCategory = 'Test category',
  } = props

  cy.get('button').contains('Create new entry').click()
  cy.get('.start-date').click()
  cy.get('.start-date').find('[aria-label="August 22, 2021"]').click()
  cy.get('.end-date').click()
  cy.get('.end-date').find('[aria-label="August 22, 2021"]').click()
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
