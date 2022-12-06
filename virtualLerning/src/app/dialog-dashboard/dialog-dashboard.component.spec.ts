import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDashboardComponent } from './dialog-dashboard.component';

describe('DialogDashboardComponent', () => {
  let component: DialogDashboardComponent;
  let fixture: ComponentFixture<DialogDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
