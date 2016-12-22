/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginRegisterService } from './login-register.service';

describe('Service: LoginRegister', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegisterService]
    });
  });

  it('should ...', inject([LoginRegisterService], (service: LoginRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
