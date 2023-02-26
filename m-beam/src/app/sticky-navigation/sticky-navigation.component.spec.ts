import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNavigationComponent } from './sticky-navigation.component';

describe('StickyNavigationComponent', () => {
  let component: StickyNavigationComponent;
  let fixture: ComponentFixture<StickyNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
