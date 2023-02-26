import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundBannerComponent } from './background-banner.component';

describe('BackgroundBannerComponent', () => {
  let component: BackgroundBannerComponent;
  let fixture: ComponentFixture<BackgroundBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
