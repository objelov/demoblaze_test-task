class Header {
  get cartLink() {
    return cy.contains('.nav-link', 'Cart');
  }

  get logInLink() {
    return cy.contains('.nav-link', 'Log in');
  }

  get signUpLink() {
    return cy.contains('.nav-link', 'Sign up');
  }

  get username() {
    return cy.get('#nameofuser');
  }
}

export default Header;
