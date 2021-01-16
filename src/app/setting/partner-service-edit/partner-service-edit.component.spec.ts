import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerServiceEditComponent } from './partner-service-edit.component';

describe('PartnerServiceEditComponent', () => {
  let component: PartnerServiceEditComponent;
  let fixture: ComponentFixture<PartnerServiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerServiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
