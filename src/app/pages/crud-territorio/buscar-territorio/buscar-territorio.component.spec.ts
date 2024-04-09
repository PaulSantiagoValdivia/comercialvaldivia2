import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTerritorioComponent } from './buscar-territorio.component';

describe('BuscarTerritorioComponent', () => {
  let component: BuscarTerritorioComponent;
  let fixture: ComponentFixture<BuscarTerritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarTerritorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTerritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
