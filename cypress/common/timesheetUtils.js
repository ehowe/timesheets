export const createTimesheet = () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: '**/api/admin/payroll_categories*',
    response: {
      payroll_categories: [{ id: 1, name: 'Test category' }]
    }
  })

  cy.visit('/')
  cy.get('button').contains('Create new timesheet').click()

  cy.get('.payroll-schedule__control')
    .click()
    .get('.payroll-schedule__menu') // find opened dropdown
    .find('.payroll-schedule__option') // find all options
    .first()
    .click()

  cy.get('.pay-period__control')
    .click()
    .get('.pay-period__menu') // find opened dropdown
    .find('.pay-period__option') // find all options
    .first()
    .click()

  return cy.get('.modal-dialog').find('button').contains('Submit').click()
}
