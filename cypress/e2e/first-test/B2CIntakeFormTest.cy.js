import { B2CIntakePage } from '../../pages';

describe('B2C Intake Form', () => {

  it('B2C Intake Form Test', () => {
    
    cy.fixture('testData').then((testData) => {
      B2CIntakePage.visit();
      B2CIntakePage.verify();
      
      B2CIntakePage.verifyNameFieldVisible();
      B2CIntakePage.verifyCityProvinceFieldVisible();
      B2CIntakePage.verifyEmailFieldVisible();
      B2CIntakePage.verifyConfirmEmailFieldVisible();
      
      const formData = {
        name: 'Usama Ahmad',
        cityProvince: 'Calgary, AB, Canada',
        email: testData.email,
        confirmEmail: testData.email
      };

      B2CIntakePage.fillForm(formData);
      B2CIntakePage.verifyNextButtonEnabled();
      B2CIntakePage.clickNext();

      B2CIntakePage.verifyFileInputVisible();
      
      cy.uploadB2CFile('cypress/fixtures/Notary-File.pdf');

      B2CIntakePage.verifyUploadSuccess();

      B2CIntakePage.verifyNextButtonEnabled();
      B2CIntakePage.clickNext();

      B2CIntakePage.typeDocumentType('Affidavit');

      B2CIntakePage.clickMyCart();

      // Click increment button first, then get and log the Notary Seals price
      B2CIntakePage.clickIncrement();
      B2CIntakePage.getNotarySealsPrice().then(price => {
        cy.log(`Extracted Notary Seals Price: ${price}`);
      });

      B2CIntakePage.getUnitPrice().then(unitPrice => {

        B2CIntakePage.getNotarySealsPrice().then(notarySealsPriceStr => {
          // Extract numeric value from price string (e.g., "$30.95" -> 30.95)
          const notarySealsPrice = Number(notarySealsPriceStr.replace(/[^0-9.]/g, ''));
          
          B2CIntakePage.getServiceFee().then(serviceFee => {
      
            B2CIntakePage.getSubtotalPrice().then(subtotal => {
      
              const expectedTotal = Number(
                (unitPrice + notarySealsPrice + serviceFee).toFixed(2)
              );
      
              cy.log(`Unit Price: ${unitPrice}`);
              cy.log(`Notary Seals Price: ${notarySealsPrice}`);
              cy.log(`Service Fee: ${serviceFee}`);
              cy.log(`Expected Total: ${expectedTotal}`);
              cy.log(`Actual Subtotal: ${subtotal}`);
      
              expect(subtotal).to.eq(expectedTotal);
      
            });
      
          });
        });
      
      });

      B2CIntakePage.clickCloseButton();

      B2CIntakePage.clickNext();

      cy.get('body').then($body => {
        const $scheduleCard = $body.find('h6:contains("Schedule on Your Own Time")').closest('.MuiCard-root');
        if ($scheduleCard.length > 0 && $scheduleCard.is(':visible')) {
          B2CIntakePage.clickScheduleOnYourOwnTime();
          B2CIntakePage.clickNext();
        } else {
          cy.log('Schedule on Your Own Time section is not visible, skipping...');
        }
      });
      
      B2CIntakePage.fillPhone('6722302014');

      B2CIntakePage.clickScanOrUploadID();

      B2CIntakePage.uploadFile('cypress/fixtures/Notary-File.pdf');

      B2CIntakePage.verifyUploadSuccess();

      B2CIntakePage.clickNext();

      B2CIntakePage.fillAdditionalEmail(testData.email);

      B2CIntakePage.clickStandardShipping();

      B2CIntakePage.fillMailingAddress('Calgary, AB, Canada');

      B2CIntakePage.clickNext();

      B2CIntakePage.selectDateAfterSevenDays();

      B2CIntakePage.clickExpandIconAfterDateSelection();

      B2CIntakePage.clickFirstAvailableTimeSlot().then(selectedTime => {
        cy.log(`Selected time slot: ${selectedTime}`);
        
      });

      B2CIntakePage.clickNext();

      B2CIntakePage.clickAboutYourDocumentAccordion();

      B2CIntakePage.verifyDocumentFileName('Notary-File.pdf');
      B2CIntakePage.verifyDocumentType('Affidavit');
      B2CIntakePage.verifyNumberOfNotarySeals(2);

      B2CIntakePage.clickCheckout();

      B2CIntakePage.verifySubtotalInSummary();

      // Get subtotal, taxes percentage, taxes amount, calculate total and verify
      B2CIntakePage.getSubtotalInSummary()
        .invoke('text')
        .then(subtotalText => {
          // Extract numeric value from subtotal (handles both "$123.45" and "123.45" formats)
          const subtotal = Number(subtotalText.trim().replace(/[^0-9.]/g, ''));
          
          B2CIntakePage.getTaxesPercentage().then(percentage => {
            B2CIntakePage.getTaxesAmount().then(taxesAmount => {
              const totalWithTaxes = Number((subtotal + taxesAmount).toFixed(2));
              
              cy.log(`Subtotal: $${subtotal}`);
              cy.log(`Taxes Percentage: ${percentage}%`);
              cy.log(`Taxes Amount: $${taxesAmount}`);
              cy.log(`Calculated Total (Subtotal + Taxes): $${totalWithTaxes}`);
              
              // Get the actual Total (CAD) from the page and verify it matches
              B2CIntakePage.getTotalCAD().then(actualTotal => {
                cy.log(`Actual Total (CAD): $${actualTotal}`);
                expect(actualTotal).to.eq(totalWithTaxes);
                cy.log(`Verification passed: Calculated total matches Actual Total (CAD)`);
              });
            });
          });
        });

      cy.get('[data-testid="rswps-form"]')
        .should('be.visible');

      cy.get('iframe.sq-card-component')
        .should('exist')
        .should('be.visible');

      B2CIntakePage.fillCardNumber('424242424242424242824242424242');
      
      B2CIntakePage.clickPaymentCardBook();
      
      B2CIntakePage.verifyPaymentProcessingText();
      
      B2CIntakePage.verifyBookingConfirmed();  

    });

  });

});
