import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegionComponent } from './crear-region.component';

describe('CrearRegionComponent', () => {
  let component: CrearRegionComponent;
  let fixture: ComponentFixture<CrearRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
