import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDialogComponent } from './head-dialog.component';

describe('HeadDialogComponent', () => {
  let component: HeadDialogComponent;
  let fixture: ComponentFixture<HeadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
