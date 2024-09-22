import PageObject from "../pageObjects";

class HomeAndCataloguePage extends PageObject {
  constructor() {
    super();

    this.url = '/index.html';
  }

  get categoryList() {
    return cy.get('.list-group');
  }

  get productCard() {
    return cy.get('.card-block');
  }

  assertProductInCategory(productName) {
    this.productCard
      .should('contain.text', productName)
      .and('be.visible');

    return this;
  }

  clickOnCategory(categoryName) {
    this.categoryList
      .contains(categoryName)
      .click();

    return this;
  }

  clickOnProduct(productName) {
    this.productCard
      .contains(productName)
      .click();

    return this;
  }
}

export default HomeAndCataloguePage;
