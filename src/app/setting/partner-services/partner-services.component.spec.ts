import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerServicesComponent } from './partner-services.component';

describe('PartnerServicesComponent', () => {
  let component: PartnerServicesComponent;
  let fixture: ComponentFixture<PartnerServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
