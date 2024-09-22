/// <reference types="cypress"/>

import HomeAndCataloguePage from '../support/pages/homeAndCatalogue';
import LoginForm from '../support/pages/loginModal';
import { generateUserData } from '../support/dataGeneration';

const alerts = require('../fixtures/alerts.json');
const title = require('../fixtures/titles.json');

const homePage = new HomeAndCataloguePage();
const loginModal = new LoginForm();

describe(`"Log in" modal`, () => {
  beforeEach(() => {
    cy.visit('');

    homePage.clickOnLoginLink();

    cy.wrap(generateUserData()).as('userData').then((userData) => {
      cy.register(userData);
    });
  });

  it('should allow to login', () => {
    loginModal.assertLoginModalIsOpened(title.loginModal);

    cy.get('@userData').then((userData) => {
      const { username } = userData;

      cy.intercept('POST', '/login').as('login');

      loginModal.fillForm(userData);

      cy.wait('@login');

      loginModal.assertUserIsLoggedIn(username);
    });
  });

  it('should not allow to login with non-existed username', () => {
    cy.wrap(generateUserData()).then((newUserData) => {
      const { username: newUsername } = newUserData;

      loginModal.typeUsername(newUsername);
    });

    cy.get('@userData').then((userData) => {
      const { password } = userData;

      cy.intercept('POST', '/login').as('login');

      loginModal.typePassword(password)
        .clickOnLoginBtn();

      cy.wait('@login');
    });

    loginModal.assertAlert(alerts.error.login.invalidUsername);
  });

  it('should not allow to login with non-existed password', () => {
    cy.get('@userData').then((userData) => {
      const { username } = userData;

      loginModal.typeUsername(username);
    });

    cy.wrap(generateUserData()).then((newUserData) => {
      const { password: newPassword } = newUserData;

      cy.intercept('POST', '/login').as('login');

      loginModal.typePassword(newPassword)
        .clickOnLoginBtn();
      
      cy.wait('@login');
    });

    loginModal.assertAlert(alerts.error.login.invalidPassword);
  });

  it('should not allow to login with the empty "Username" field', () => {
    cy.get('@userData').then((userData) => {
      const { password } = userData;

      loginModal.typePassword(password)
        .clickOnLoginBtn()
        .assertAlert(alerts.error.login.emptyFields);
    });
  });

  it('should not allow to login with the empty "Password" field', () => {
    cy.get('@userData').then((userData) => {
      const { username } = userData;

      loginModal.typeUsername(username)
        .clickOnLoginBtn()
        .assertAlert(alerts.error.login.emptyFields);
    });
  });
});
