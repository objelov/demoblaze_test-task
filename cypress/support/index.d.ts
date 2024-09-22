/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    register(userData: object): Chainable<any>
    retryInputAction(expectedValue: string, field: string): Chainable<any>
  }
}
