import { B2CIntakePage } from '../../pages';

describe('B2C Intake Form', () => {

  it('B2C Intake Form Test', () => {
    
    B2CIntakePage.visit();
    B2CIntakePage.verify();
    
    B2CIntakePage.verifyNameFieldVisible();
    B2CIntakePage.verifyCityProvinceFieldVisible();
    B2CIntakePage.verifyEmailFieldVisible();
    B2CIntakePage.verifyConfirmEmailFieldVisible();
    
    const formData = {
      name: 'Usama Ahmad',
      cityProvince: 'Calgary, AB, Canada',
      email: 'usama.ahmad@tectsoft.com',
      confirmEmail: 'usama.ahmad@tectsoft.com'
    };

    B2CIntakePage.fillForm(formData);
    B2CIntakePage.verifyNextButtonEnabled();
    B2CIntakePage.clickNext();
  });

});
