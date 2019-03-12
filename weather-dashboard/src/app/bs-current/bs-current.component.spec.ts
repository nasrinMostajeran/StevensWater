import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsCurrentComponent } from './bs-current.component';

describe('BsCurrentComponent', () => {
  let component: BsCurrentComponent;
  let fixture: ComponentFixture<BsCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
