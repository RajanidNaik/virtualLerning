import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoryComponent } from './dialog-category.component';

describe('DialogCategoryComponent', () => {
  let component: DialogCategoryComponent;
  let fixture: ComponentFixture<DialogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
