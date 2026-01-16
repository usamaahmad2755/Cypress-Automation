const { BasePage } = require('./BasePage');

/**
 * B2C Intake Page Object - Cypress Style
 * This page object handles interactions with the B2C Intake Form
 */
const B2CIntakePage = {
  
  get nameField() {
    return 'input[data-testid="intake-basic-info-full-name-input"]';
  },

  get cityProvinceField() {
    return 'input[data-testid="google-places-location-input"]';
  },

  get mailingAddressField() {
    return 'input[data-testid="google-places-mailing-input"]';
  },

  get emailField() {
    return 'input[data-testid="intake-basic-info-email-input"]';
  },

  get confirmEmailField() {
    return 'input[data-testid="intake-basic-info-confirm-email-input"]';
  },

  get phoneField() {
    return 'input[data-testid="identity-info-phone-input"]';
  },

  get additionalEmailField() {
    return 'input[data-testid="add-recipient-email-input"]';
  },

  get nextButton() {
    return 'button:contains("Next")';
  },

  get checkoutButton() {
    return 'button[data-testid="checkout-footer-submit"]';
  },

  get paymentCardBookButton() {
    return 'button[data-testid="payment-card-book"]';
  },

  get fileInput() {
    return '#fileInput';
  },

  get fileUploadText() {
    return 'p:contains("Drag & drop or choose file to upload")';
  },

  get uploadSuccessAlert() {
    return 'div.MuiAlert-message:contains("Document uploaded successfully")';
  },

  get documentTypeInput() {
    return 'input[placeholder="Search or Describe Your Document"]';
  },

  get unitPrice() {
    return 'p.text-muted:not(:contains("Subtotal"))';
  },

  get incrementButton() {
    return 'p.MuiTypography-body1 + button';
  },
  
  get subtotalPrice() {
    return 'h6:contains("Subtotal") span.text-dark';
  },

  get myCartButton() {
    return 'button[data-testid="header-cart-toggle"]';
  },

  get serviceFeeLabel() {
    return 'p:contains("Instant Notary Service Fee")';
  },
  
  get serviceFeeValue() {
    return 'p:contains("Instant Notary Service Fee") + p.text-muted';
  },

  closeButton() {
    return cy.get('button[data-testid="cart-drawer-close"]');
  },

  getNameField() {
    return cy.get(this.nameField);
  },

  getCityProvinceField() {
    return cy.get(this.cityProvinceField);
  },

  getMailingAddressField() {
    return cy.get(this.mailingAddressField);
  },

  getEmailField() {
    return cy.get(this.emailField);
  },

  getConfirmEmailField() {
    return cy.get(this.confirmEmailField);
  },

  getPhoneField() {
    return cy.get(this.phoneField);
  },

  getNextButton() {
    return cy.get(this.nextButton);
  },

  getFileInput() {
    return cy.get(this.fileInput);
  },

  visit() {
    return BasePage.visit(this.url);
  },

  verify() {
    return cy.get('.logo img[src="/images/notaryPro-logo.svg"]').should('be.visible');
  },

  fillName(name) {
    return cy.get(this.nameField).clear().type(name);
  },

  fillCityProvince(cityProvince) {
    return cy.get(this.cityProvinceField).clear().type(cityProvince);
  },

  fillMailingAddress(address) {
    return cy.get(this.mailingAddressField).clear().type(address);
  },

  fillEmail(email) {
    return cy.get(this.emailField).clear().type(email);
  },

  fillConfirmEmail(email) {
    return cy.get(this.confirmEmailField).clear().type(email);
  },

  fillPhone(phone) {
    return cy.get(this.phoneField).clear().type(phone);
  },

  fillAdditionalEmail(email) {
    return cy.get(this.additionalEmailField).last().clear().type(email);
  },

  fillCardNumber(cardNumber) {
    return cy.get('iframe.sq-card-component',)
      .should('be.visible')
      .then(($iframe) => {
        cy.wrap($iframe).realClick();
        
        cy.get('body').realPress('Home');
        
        cy.get('body').realPress(['Control', 'a']);
        
        cy.get('body').realPress('Backspace');
        
        const cardNumberStr = cardNumber.replace(/\s/g, '');
        cy.get('body').realType(cardNumberStr, { delay: 100 });
        
        return cy.wrap(true);
      });
  },

  fillExpirationDate(expirationDate) {
    
    return cy.get('iframe.sq-card-component')
      .should('be.visible')
      .then(() => {

        cy.get('body').realPress('Tab');
        
        cy.get('body').realPress(['Control', 'a']);

        cy.get('body').realPress('Backspace');
        
        cy.get('body').realType(expirationDate, { delay: 100 });
        
        cy.log('Expiration date typed');
        return cy.wrap(true);
      });
  },

  fillCVV(cvv) {
    
    return cy.get('iframe.sq-card-component')
      .should('be.visible')
      .then(() => {
        
        cy.get('body').realPress('Tab');
        
        cy.get('body').realPress(['Control', 'a']);
    
        cy.get('body').realPress('Backspace');
        
        cy.get('body').realType(cvv, { delay: 100 });
        
        cy.log('CVV typed');
        return cy.wrap(true);
      });
  },

  fillPostalCode(postalCode) {
    return cy.get('iframe.sq-card-component')
      .should('be.visible')
      .then(($iframe) => {
        
        cy.wrap($iframe).realClick();
        
        cy.get('body').realPress('Tab');
        
        cy.get('body').realPress(['Control', 'a']);

        cy.get('body').realPress('Backspace');
        
        cy.get('body').realType(postalCode, { delay: 100 });
        
        return cy.wrap(true);
      });
  },

  clickNext() {
    return cy.get(this.nextButton).click();
  },

  clickCheckout() {
    return cy.get(this.checkoutButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  clickPaymentCardBook() {
    return cy.get(this.paymentCardBookButton)
      .should('be.visible')
      .should('be.enabled')
      .click();
  },

  verifyPaymentProcessingText() {
    return cy.contains('We are processing your payment.')
      .should('be.visible');
  },

  verifyBookingConfirmed() {
    return cy.contains('h5', 'Your Booking is Confirmed!', { timeout: 20000 })
      .should('be.visible');
  },

  fillForm(formData) {
    const { name, cityProvince, email, confirmEmail, phone } = formData;
    
    this.fillName(name);
    this.fillCityProvince(cityProvince);
    this.fillEmail(email);
    this.fillConfirmEmail(confirmEmail);
    if (phone) {
      this.fillPhone(phone);
    }
    
    return cy;
  },

  submitForm(formData) {
    this.fillForm(formData);
    return this.clickNext();
  },

  verifyNameFieldVisible() {
    return cy.get(this.nameField).should('be.visible');
  },

  verifyCityProvinceFieldVisible() {
    return cy.get(this.cityProvinceField).should('be.visible');
  },

  verifyEmailFieldVisible() {
    return cy.get(this.emailField).should('be.visible');
  },

  verifyConfirmEmailFieldVisible() {
    return cy.get(this.confirmEmailField).should('be.visible');
  },

  verifyNextButtonEnabled() {
    return cy.get(this.nextButton).should('be.enabled');
  },

  verifyFileInputVisible() {
    return cy.get(this.fileUploadText).should('be.visible');
  },

  verifyUploadSuccess() {
    return cy.get(this.uploadSuccessAlert).should('be.visible');
  },

  /**
   * Upload file(s) using Cypress selectFile command
   * Temporarily removes the hidden attribute to make the input visible for upload
   * @param {string|string[]|File|File[]} file - File path(s), fixture path(s), or File object(s)
   * @param {object} options - Options for selectFile
   * @returns {Cypress.Chainable}
   * 
   */
  uploadFile(file, options = {}) {
    return cy.get(this.fileInput)
      .invoke('removeAttr', 'hidden')
      .should('be.visible')
      .selectFile(file, options)
      .invoke('attr', 'hidden', '');
  },

  typeDocumentType(value) {
    return cy.get(this.documentTypeInput)
      .should('be.visible')
      .click()
      .clear()
      .type(`${value}{enter}`);
  },

  clickMyCart() {
    return cy.get(this.myCartButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  getUnitPrice() {
    return cy.get('p.MuiTypography-root.MuiTypography-body1.text-muted')
      .should('be.visible')
      .first()
      .invoke('text')
      .then(text => Number(text.replace(/[^0-9.]/g, '')));
  },

  clickIncrement() {
    return cy.get(this.incrementButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  getSubtotalPrice() {
    return cy.get(this.subtotalPrice)
      .should('be.visible')
      .invoke('text')
      .then(text => Number(text.replace(/[^0-9.]/g, '')));
  },

  getServiceFee() {
    return cy.get('body').then($body => {
  
      if ($body.find(this.serviceFeeLabel).length > 0) {
        return cy.get(this.serviceFeeValue)
          .should('be.visible')
          .invoke('text')
          .then(text => Number(text.replace(/[^0-9.]/g, '')));
      }
  
      return 0;
    });
  },

  clickCloseButton() {
    return this.closeButton()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  scheduleOnYourOwnTimeCard() {
    return cy.contains('h6', 'Schedule on Your Own Time')
      .closest('.MuiCard-root');
  },

  clickScheduleOnYourOwnTime() {
    return this.scheduleOnYourOwnTimeCard()
      .should('be.visible')
      .click();
  },

  clickScanOrUploadID() {
    return cy.contains('button', 'Scan or Upload ID')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  standardShippingCard() {
    return cy.get('[data-testid="addon-card-2-select"]');
  },

  clickStandardShipping() {
    return this.standardShippingCard()
      .should('be.visible')
      .click();
  },

  selectedDateTab() {
    return cy.get('button[role="tab"][aria-selected="true"]');
  },

  dateTabByLabel(label) {
    return cy.contains('button[role="tab"]', label);
  },

  scrollRightButton() {

    return cy.get('body').then($body => {
      const $button = $body.find('svg[data-testid="KeyboardArrowRightIcon"]').closest('button');
      if ($button.length > 0) {
        return cy.wrap($button);
      }
      
      return cy.wrap(Cypress.$());
    });
  },

  getDateAfterSevenDays(currentLabel) {
    
    const [month, day] = currentLabel.split(' ');
    const date = new Date(`${month} ${day}, ${new Date().getFullYear()}`);
    date.setDate(date.getDate() + 7);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    }).replace(',', '');
  },

  selectDateAfterSevenDays() {
    this.selectedDateTab()
      .invoke('text')
      .then(text => {

        const currentDateLabel = text.trim();
        const targetDateLabel = this.getDateAfterSevenDays(currentDateLabel);

        const tryClickTarget = (retryCount = 0) => {
          const maxRetries = 10; 
          
          if (retryCount >= maxRetries) {
            cy.log('Max retries reached');
            return;
          }

          cy.get('body').then($body => {
            const $targetEl = $body.find('button[role="tab"]').filter((index, el) => {
              return Cypress.$(el).text().trim() === targetDateLabel;
            });

            const $scrollBtn = $body.find('svg[data-testid="KeyboardArrowRightIcon"]').closest('button');
            const canScroll = $scrollBtn.length > 0 && !$scrollBtn.hasClass('Mui-disabled');

            if ($targetEl.length > 0) {
              
              if (canScroll && retryCount < 2) {
                cy.wrap($scrollBtn).click();
                cy.wait(300);
                tryClickTarget(retryCount + 1);
              } else {

                cy.contains('button[role="tab"]', targetDateLabel)
                  .scrollIntoView()
                  .should('be.visible')
                  .click();
              }
            } else if (canScroll) {
              
              cy.wrap($scrollBtn).click();
              cy.wait(300);
              tryClickTarget(retryCount + 1);
            } else {
            
              cy.log(`Target date ${targetDateLabel} not found and cannot scroll`);
            }
          });
        };

        tryClickTarget();
      });
  },

  /**
   * Clicks the expand icon (ExpandMoreIcon) after date selection
   * Finds the expand icon within the Morning card and clicks when visible
   * @returns {Cypress.Chainable}
   */
  clickExpandIconAfterDateSelection() {
    return cy.contains('div.MuiTypography-body1', 'Morning')
      .closest('.MuiCard-root')
      .find('svg[data-testid="ExpandMoreIcon"]')
      .should('be.visible')
      .closest('button')
      .should('be.visible')
      .click();
  },

  /**
   * Clicks on the first available time slot and returns its text
   * Available slots have class 'css-9oax0x', selected/booked ones have 'css-12tonjy'
   * After clicking, waits for the selected slot to have the 'css-12tonjy' class and be visible
   * @returns {Cypress.Chainable<string>} The time slot text (e.g., "06:15")
   */
  clickFirstAvailableTimeSlot() {
    let timeText;
    return cy.get('.MuiAccordionDetails-root')
      .find('.MuiCard-root.css-9oax0x')
      .first()
      .should('be.visible')
      .then($card => {
        timeText = $card.find('p.MuiTypography-body2').text().trim();
        return cy.wrap($card);
      })
      .click()
      .then(() => {
        // After clicking, check that the slot with the selected time is visible and has css-12tonjy class
        return cy.contains('.MuiCard-root p.MuiTypography-body2', timeText)
          .closest('.MuiCard-root')
          .should('be.visible')
          .and('have.class', 'css-12tonjy');
      })
      .then(() => cy.wrap(timeText));
  },

  aboutYourDocumentAccordion() {
    return cy.contains('h6.MuiTypography-subtitle1', 'About Your Document')
      .closest('.MuiAccordion-heading')
      .find('svg[data-testid="ExpandMoreIcon"]')
      .should('be.visible')
      .closest('button')
      .should('be.visible');
  },

  /**
   * Clicks on the "About Your Document" accordion to expand/collapse it
   * Finds the accordion by the heading text, then locates the ExpandMoreIcon and clicks the button
   * @returns {Cypress.Chainable}
   */
  clickAboutYourDocumentAccordion() {
    return this.aboutYourDocumentAccordion().click();
  },

  /**
   * Gets the file name element within the "About Your Document" accordion
   * @returns {Cypress.Chainable}
   */
  getDocumentFileName() {
    return cy.contains('h6.MuiTypography-subtitle1', 'About Your Document')
      .closest('.MuiAccordion-root')
      .find('.MuiAccordionDetails-root')
      .find('p.MuiTypography-body1')
      .first();
  },

  /**
   * Gets the document type chip element within the "About Your Document" accordion
   * Uses data-testid="CancelIcon" to locate the chip, then gets the label
   * @returns {Cypress.Chainable}
   */
  getDocumentTypeChip() {
    return cy.contains('h6.MuiTypography-subtitle1', 'About Your Document')
      .closest('.MuiAccordion-root')
      .find('.MuiAccordionDetails-root')
      .find('svg[data-testid="CancelIcon"]')
      .closest('.MuiChip-root')
      .find('.MuiChip-label');
  },

  /**
   * Gets the number of notary seals input field within the "About Your Document" accordion
   * @returns {Cypress.Chainable}
   */
  getNumberOfNotarySealsInput() {
    return cy.contains('h6.MuiTypography-subtitle1', 'About Your Document')
      .closest('.MuiAccordion-root')
      .find('.MuiAccordionDetails-root')
      .find('input[type="number"]');
  },

  /**
   * Verifies the file name in the "About Your Document" accordion
   * @param {string} expectedFileName - Expected file name (e.g., "Notary-File.pdf")
   * @returns {Cypress.Chainable}
   */
  verifyDocumentFileName(expectedFileName) {
    return this.getDocumentFileName()
      .should('be.visible')
      .and('contain.text', expectedFileName);
  },

  /**
   * Verifies the document type in the "About Your Document" accordion
   * @param {string} expectedDocumentType - Expected document type (e.g., "Affidavit")
   * @returns {Cypress.Chainable}
   */
  verifyDocumentType(expectedDocumentType) {
    return this.getDocumentTypeChip()
      .should('be.visible')
      .and('contain.text', expectedDocumentType);
  },

  /**
   * Verifies the number of notary seals in the "About Your Document" accordion
   * @param {number|string} expectedNumber - Expected number of seals (e.g., 2 or "2")
   * @returns {Cypress.Chainable}
   */
  verifyNumberOfNotarySeals(expectedNumber) {
    return this.getNumberOfNotarySealsInput()
      .should('be.visible')
      .and('have.value', String(expectedNumber));
  },

  /**
   * Gets the subtotal element from the summary section
   * Uses id="subtotal-1" to locate the subtotal
   * @returns {Cypress.Chainable}
   */
  getSubtotalInSummary() {
    return cy.get('#subtotal-1')
      .find('.MuiBox-root.css-70qvj9')
      .find('p.MuiTypography-body2')
      .last();
  },

  /**
   * Gets the price value from a summary line item by its id
   * @param {string} itemId - The id of the summary item (e.g., "service", "additional-seals", "addons-2")
   * @returns {Cypress.Chainable<number>}
   */
  getSummaryItemPrice(itemId) {
    return cy.get(`#${itemId}`)
      .find('.MuiBox-root.css-70qvj9')
      .find('p.MuiTypography-body2')
      .last()
      .should('be.visible')
      .invoke('text')
      .then(text => Number(text.trim()));
  },

  /**
   * Verifies the subtotal value in the summary section is visible and has a value
   * @returns {Cypress.Chainable}
   */
  verifySubtotalInSummary() {
    return this.getSubtotalInSummary()
      .should('be.visible')
      .invoke('text')
      .then(text => {
        const subtotalValue = Number(text.trim());
        expect(subtotalValue).to.be.a('number');
        expect(subtotalValue).to.be.greaterThan(0);
      });
  },

  /**
   * Gets the Notary Seals price value from the HTML structure
   * Finds the div containing "Notary Seals" and extracts the price from the second paragraph
   * @returns {Cypress.Chainable<string>} The price value (e.g., "$30.95")
   */
  getNotarySealsPrice() {
    return cy.contains('p.MuiTypography-body1', 'Notary Seals')
      .closest('div.d-flex.flex-column.justify-content-center.align-items-start')
      .find('p.text-muted')
      .should('be.visible')
      .invoke('text')
      .then(price => {
        const priceValue = price.trim();
        cy.log(`Notary Seals Price: ${priceValue}`);
        return cy.wrap(priceValue);
      });
  },

  /**
   * Gets the taxes percentage from the taxes section
   * Extracts percentage from text like "Taxes (5.00%) & Fees"
   * @returns {Cypress.Chainable<number>} The percentage value (e.g., 5.00)
   */
  getTaxesPercentage() {
    return cy.get('#taxes-1')
      .find('p.MuiTypography-body2')
      .contains('Taxes')
      .should('be.visible')
      .invoke('text')
      .then(text => {
        // Extract percentage from text like "Taxes (5.00%) & Fees"
        const match = text.match(/\(([\d.]+)%\)/);
        const percentage = match ? Number(match[1]) : 0;
        cy.log(`Taxes Percentage: ${percentage}%`);
        return cy.wrap(percentage);
      });
  },

  /**
   * Gets the taxes amount from the taxes section
   * Combines the $ symbol and the amount value
   * @returns {Cypress.Chainable<number>} The taxes amount (e.g., 6.81)
   */
  getTaxesAmount() {
    return cy.get('#taxes-1')
      .find('.MuiBox-root.css-70qvj9')
      .should('be.visible')
      .invoke('text')
      .then(text => {
        // Extract numeric value from text (e.g., "$6.81" -> 6.81)
        const taxesAmount = Number(text.trim().replace(/[^0-9.]/g, ''));
        cy.log(`Taxes Amount: $${taxesAmount}`);
        return cy.wrap(taxesAmount);
      });
  },

  /**
   * Gets the Total (CAD) value from the summary section
   * Finds the div containing "Total (CAD)" and extracts the total amount
   * @returns {Cypress.Chainable<number>} The total amount (e.g., 102.66)
   */
  getTotalCAD() {
    return cy.contains('p.MuiTypography-body2', 'Total (CAD)')
      .closest('.MuiBox-root.css-k3gutg')
      .find('.MuiBox-root.css-70qvj9')
      .should('be.visible')
      .invoke('text')
      .then(text => {
        // Extract numeric value from text (e.g., "$102.66" -> 102.66)
        const total = Number(text.trim().replace(/[^0-9.]/g, ''));
        cy.log(`Total (CAD): $${total}`);
        return cy.wrap(total);
      });
  }

};

module.exports = { B2CIntakePage };
