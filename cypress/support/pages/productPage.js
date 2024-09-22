import PageObject from "../pageObjects";

class ProductPage extends PageObject {
  get productTitle() {
    return cy.get('.name');
  }

  get productPrice() {
    return cy.get('.price-container');
  }

  get productImage() {
    return cy.get('.product-image');
  }

  get addToCartBtn() {
    return cy.get('[onclick="addToCart(1)"]');
  }

  assertProductDetails(products, productName) {
    const device = products
      .find(device => device.model.includes(productName));
    const {
      image,
      model,
      price
    } = device;

    this.productImage
      .find('img')
      .should('be.visible')
      .and('have.attr', 'src', image);

    this.productTitle
      .should('be.visible')
      .and('contain.text', model);

    this.productPrice
      .should('be.visible')
      .and('contain.text', price);

    return this;
  }

  clickOnAddToCartBtn() {
    this.addToCartBtn
      .click();

    return this;
  }
}

export default ProductPage;
