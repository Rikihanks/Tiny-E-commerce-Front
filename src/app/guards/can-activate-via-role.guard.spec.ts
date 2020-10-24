import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateViaRoleGuard } from './can-activate-via-role.guard';

describe('CanActivateViaRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaRoleGuard]
    });
  });

  it('should ...', inject([CanActivateViaRoleGuard], (guard: CanActivateViaRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
