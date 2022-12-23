import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCertificateComponent } from './fill-certificate.component';

describe('FillCertificateComponent', () => {
  let component: FillCertificateComponent;
  let fixture: ComponentFixture<FillCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
