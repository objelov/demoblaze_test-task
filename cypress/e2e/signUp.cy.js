/// <reference types="cypress"/>

import HomeAndCataloguePage from '../support/pages/homeAndCatalogue';
import SignUpForm from '../support/pages/signUpModal';
import { generateUserData } from '../support/dataGeneration';

const alerts = require('../fixtures/alerts.json');
const title = require('../fixtures/titles.json');

const homePage = new HomeAndCataloguePage();
const signUpModal = new SignUpForm();

describe(`"Sign up" modal`, () => {
  beforeEach(() => {
    cy.wrap(generateUserData()).as('userData');

    cy.visit('');

    homePage.clickOnSignUpLink();
  });

  it('should allow to register a new user', () => {
    signUpModal.assertSignUpModalIsOpened(title.signUpModal);

    cy.get('@userData').then((userData) => {
      cy.intercept('POST', '/signup').as('registration');

      signUpModal.fillForm(userData);

      cy.wait('@registration');
    });

    signUpModal.assertAlert(alerts.success.signUp);
  });

  it('should not allow to register with existed username', () => {
    cy.wrap(generateUserData()).as('newUserData');

    cy.get('@userData').then((userData) => {
      const { username } = userData;

      cy.register(userData);

      signUpModal.typeUsername(username);
    });

    cy.get('@newUserData').then((newUserData) => {
      const { password: newPassword } = newUserData;

      cy.intercept('POST', '/signup').as('registration');

      signUpModal.typePassword(newPassword)
        .clickOnSignUpBtn();

      cy.wait('@registration');
    });

    signUpModal.assertAlert(alerts.error.registration.existedUser);
  });

  it('should not allow to register with the empty "Username" field', () => {
    cy.get('@userData').then((userData) => {
      const { password } = userData;

      signUpModal.typePassword(password)
        .clickOnSignUpBtn()
        .assertAlert(alerts.error.registration.emptyFields);
    });
  });

  it('should not allow to register with the empty "Password" field', () => {
    cy.get('@userData').then((userData) => {
      const { username } = userData;

      signUpModal.typeUsername(username)
        .clickOnSignUpBtn()
        .assertAlert(alerts.error.registration.emptyFields);
    });
  });
});
