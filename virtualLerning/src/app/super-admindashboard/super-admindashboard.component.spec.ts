import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdmindashboardComponent } from './super-admindashboard.component';

describe('SuperAdmindashboardComponent', () => {
  let component: SuperAdmindashboardComponent;
  let fixture: ComponentFixture<SuperAdmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdmindashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
