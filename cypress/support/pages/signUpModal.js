import PageObject from "../pageObjects";

class SignUpForm extends PageObject {
  get title() {
    return cy.get('#signInModalLabel');
  }

  get usernameField() {
    return cy.get('#sign-username');
  }

  get passwordField() {
    return cy.get('#sign-password');
  }

  get signUpBtn() {
    return cy.get('button[onclick="register()"]');
  }

  assertSignUpModalIsOpened(title) {
    this.title
      .should('contain.text', title);

    this.usernameField
      .should('exist')
      .and('be.visible');

    this.passwordField
      .should('exist')
      .and('be.visible');

    this.signUpBtn
      .should('exist')
      .and('be.visible');

    return this;
  }

  typeUsername(username) {
    this.usernameField
      .focus()
      .type(username)
      .then(() => {
        cy.retryInputAction(username, '#sign-username')
      });

    return this;
  }


  typePassword(password) {
    this.passwordField
      .focus()
      .type(password)
      .then(() => {
        cy.retryInputAction(password, '#sign-password');
      });

    return this;
  }

  clickOnSignUpBtn() {
    this.signUpBtn
      .click();

    return this;
  }

  fillForm(userData) {
    const {
      username,
      password
    } = userData;

    this.typeUsername(username);

    this.typePassword(password);

    this.clickOnSignUpBtn();

    return this;
  }
}

export default SignUpForm;
