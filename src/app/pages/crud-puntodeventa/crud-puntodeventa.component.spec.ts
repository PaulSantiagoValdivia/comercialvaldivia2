import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPuntodeventaComponent } from './crud-puntodeventa.component';

describe('CrudPuntodeventaComponent', () => {
  let component: CrudPuntodeventaComponent;
  let fixture: ComponentFixture<CrudPuntodeventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPuntodeventaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudPuntodeventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
