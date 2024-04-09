import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPuntodeventaComponent } from './crear-puntodeventa.component';

describe('CrearPuntodeventaComponent', () => {
  let component: CrearPuntodeventaComponent;
  let fixture: ComponentFixture<CrearPuntodeventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPuntodeventaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPuntodeventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
