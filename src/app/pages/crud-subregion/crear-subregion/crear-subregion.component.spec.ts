import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubregionComponent } from './crear-subregion.component';

describe('CrearSubregionComponent', () => {
  let component: CrearSubregionComponent;
  let fixture: ComponentFixture<CrearSubregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSubregionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSubregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
