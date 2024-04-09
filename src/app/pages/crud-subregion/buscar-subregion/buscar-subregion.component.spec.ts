import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSubregionComponent } from './buscar-subregion.component';

describe('BuscarSubregionComponent', () => {
  let component: BuscarSubregionComponent;
  let fixture: ComponentFixture<BuscarSubregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarSubregionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarSubregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
