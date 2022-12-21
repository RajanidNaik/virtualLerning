import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatComponent } from './sub-cat.component';

describe('SubCatComponent', () => {
  let component: SubCatComponent;
  let fixture: ComponentFixture<SubCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
