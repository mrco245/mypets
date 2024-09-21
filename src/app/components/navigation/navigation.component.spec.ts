import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviagationComponent } from './navagation.component';

describe('NaviagationComponent', () => {
  let component: NaviagationComponent;
  let fixture: ComponentFixture<NaviagationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviagationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
