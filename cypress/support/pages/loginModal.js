import PageObject from "../pageObjects";

class LoginForm extends PageObject{
  get title() {
    return cy.get('#logInModalLabel');
  }

  get usernameField() {
    return cy.get('#loginusername');
  }

  get passwordField() {
    return cy.get('#loginpassword');
  }

  get loginBtn() {
    return cy.get('button[onclick="logIn()"]');
  }

  assertLoginModalIsOpened(title) {
    this.title
      .should('contain.text', title);

    this.usernameField
      .should('exist')
      .and('be.visible');

    this.passwordField
      .should('exist')
      .and('be.visible');

    this.loginBtn
      .should('exist')
      .and('be.visible');

    return this;
  }

  typeUsername(username) {
    this.usernameField
      .focus()
      .type(username)
      .then(() => {
        cy.retryInputAction(username, '#loginusername')
      });

    return this;
  }

  typePassword(password) {
    this.passwordField
      .focus()
      .type(password)
      .then(() => {
        cy.retryInputAction(password, '#loginpassword');
      });

    return this;
  }

  clickOnLoginBtn() {
    this.loginBtn
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

    this.clickOnLoginBtn();

    return this;
  }
}

export default LoginForm;
