/// <reference types="cypress"/>

import CartPage from '../support/pages/cartPage';
import HomeAndCataloguePage from '../support/pages/homeAndCatalogue';
import ProductPage from '../support/pages/productPage';

const alerts = require('../fixtures/alerts.json');
const devices = require('../fixtures/devices.json');
const categories = require('../fixtures/categories.json');

const homePage = new HomeAndCataloguePage();
const productPage = new ProductPage();
const cartPage = new CartPage();

describe(`User flow`, () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should allow to add "Samsung Galaxy s6" to the cart', () => {
    const productName = "Samsung galaxy s6";

    homePage.clickOnCategory(categories.phones)
      .assertProductInCategory(productName)
      .clickOnProduct(productName);

    cy.intercept('POST', '/addtocart').as('addToCart');

    productPage.assertProductDetails(devices.Samsung, productName)
      .clickOnAddToCartBtn();

    cy.wait('@addToCart');

    productPage.assertAlert(alerts.productAdded)
      .clickOnCartLink();

    cartPage.assertPageUrl(cartPage.url)
      .assertProductInCart(devices.Samsung);
  });
});
