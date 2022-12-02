import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHeadComponent } from './second-head.component';

describe('SecondHeadComponent', () => {
  let component: SecondHeadComponent;
  let fixture: ComponentFixture<SecondHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
