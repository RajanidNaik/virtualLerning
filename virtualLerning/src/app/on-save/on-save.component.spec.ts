import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSaveComponent } from './on-save.component';

describe('OnSaveComponent', () => {
  let component: OnSaveComponent;
  let fixture: ComponentFixture<OnSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
