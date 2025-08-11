import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationLoginComponent } from './federation-login.component';

describe('FederationLoginComponent', () => {
  let component: FederationLoginComponent;
  let fixture: ComponentFixture<FederationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FederationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
