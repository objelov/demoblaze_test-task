import Header from "./pages/header";

class PageObject {
  constructor() {
    this.header = new Header();
  }

  assertAlert(alertMessage) {
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq(alertMessage);
    });

    return this;
  }

  assertPageUrl(url) {
    cy.url()
      .should('equal', Cypress.config().baseUrl + `${url}`);

    return this;
  }

  clickOnCartLink() {
    this.header.cartLink
      .click();

    return this;
  }

  clickOnSignUpLink() {
    this.header.signUpLink
      .click();

    return this;
  }

  clickOnLoginLink() {
    this.header.logInLink
      .click();

    return this;
  }

  assertUserIsLoggedIn(username) {
    this.header.username
      .should('be.visible')
      .and('contain.text', `Welcome ${username}`);

    return this;
  }
}

export default PageObject;
