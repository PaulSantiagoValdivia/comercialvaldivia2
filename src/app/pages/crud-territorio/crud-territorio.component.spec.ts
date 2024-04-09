import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTerritorioComponent } from './crud-territorio.component';

describe('CrudTerritorioComponent', () => {
  let component: CrudTerritorioComponent;
  let fixture: ComponentFixture<CrudTerritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTerritorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudTerritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
