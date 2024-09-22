/// <reference types="cypress"/>

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', (userData) => {
  const {
    username,
    password
  } = userData;
  const encodedPassword = btoa(password);

  cy.request('POST', 'https://api.demoblaze.com/signup',
    {
      username,
      password: encodedPassword,
    }
  );
});

Cypress.Commands.add('retryInputAction', (expectedInput, field) => {
  cy.get(field).invoke('val').then((inputValue) => {
    if (inputValue !== expectedInput) {
      cy.get(field)
        .focus()
        .clear()
        .type(expectedInput)
        .then(() => {
          cy.retryInputAction(expectedInput, field);
        });
    }
  });
});
