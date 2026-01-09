/**
 * Central export file for all page objects
 * This makes it easy to import page objects in tests
 * 
 * Note: Cypress test files can use ES6 imports even in CommonJS projects
 */
const { BasePage } = require('./BasePage');
// const { HomePage } = require('./HomePage');
// const { LoginPage } = require('./LoginPage');
const { B2CIntakePage } = require('./B2CIntakePage');

// For CommonJS require
module.exports = {
  BasePage,
  //HomePage,
  // LoginPage,
  B2CIntakePage
};

// For ES6 imports (Cypress supports this in test files)
module.exports.BasePage = BasePage;
//module.exports.HomePage = HomePage;
//module.exports.LoginPage = LoginPage;
module.exports.B2CIntakePage = B2CIntakePage;