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

      B2CIntakePage.getUnitPrice().then(unitPrice => {

        B2CIntakePage.clickIncrement();
      
        B2CIntakePage.getServiceFee().then(serviceFee => {
      
          B2CIntakePage.getSubtotalPrice().then(subtotal => {
      
            const expectedTotal = Number(
              ((unitPrice * 2) + serviceFee).toFixed(2)
            );
      
            expect(subtotal).to.eq(expectedTotal);
      
          });
      
        });
      
      });

      B2CIntakePage.clickCloseButton();

      B2CIntakePage.clickNext();

      B2CIntakePage.clickScheduleOnYourOwnTime();

      B2CIntakePage.clickNext();
      
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

    });

  });

});
