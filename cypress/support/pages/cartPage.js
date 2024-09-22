import PageObject from "../pageObjects";

class CartPage extends PageObject {
  constructor() {
    super();

    this.url = '/cart.html';
  }

  get productTable() {
    return cy.get('table tbody');
  }

  assertProductInCart(products) {
    products.forEach(device => {
      this.productTable
        .find('tr')
        .contains(device.model)
        .parent()
        .within(() => {
          cy.get('td').eq(0).find('img').should('have.attr', 'src', device.image);
          cy.get('td').eq(1).should('contain.text', device.model);
          cy.get('td').eq(2).should('contain.text', device.price);
        });
    });

    return this;
  }
}

export default CartPage;
