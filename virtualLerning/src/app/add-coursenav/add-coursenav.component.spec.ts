import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursenavComponent } from './add-coursenav.component';

describe('AddCoursenavComponent', () => {
  let component: AddCoursenavComponent;
  let fixture: ComponentFixture<AddCoursenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoursenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoursenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
