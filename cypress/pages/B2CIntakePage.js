const { BasePage } = require('./BasePage');

/**
 * B2C Intake Page Object - Cypress Style
 * This page object handles interactions with the B2C Intake Form
 */
const B2CIntakePage = {
  
  get nameField() {
    return 'input[name="name"]';
  },

  get cityProvinceField() {
    return 'input[name="random-name-field"]';
  },

  get mailingAddressField() {
    return 'input[placeholder="Mailing Address"]';
  },

  get emailField() {
    return 'input[name="email"]';
  },

  get confirmEmailField() {
    return 'input[name="confirmEmail"]';
  },

  get phoneField() {
    return 'input[name="phone"]';
  },

  get additionalEmailField() {
    return 'input.MuiInputBase-input.MuiOutlinedInput-input[type="text"]';
  },

  get nextButton() {
    return 'button:contains("Next")';
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
    return 'button';
  },

  get serviceFeeLabel() {
    return 'p:contains("Instant Notary Service Fee")';
  },
  
  get serviceFeeValue() {
    return 'p:contains("Instant Notary Service Fee") + p.text-muted';
  },

  closeButton() {
    return cy.contains('button', 'Close');
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

  clickNext() {
    return cy.get(this.nextButton).click();
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
    return cy.contains(this.myCartButton, 'My Cart')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  },

  getUnitPrice() {
    return cy.get('p.text-muted')
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
    return cy.contains('p.MuiTypography-body1', 'Standard Shipping')
      .closest('.MuiCardContent-root')
      .closest('.MuiBox-root');
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
  }

};

module.exports = { B2CIntakePage };
