import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudZonaComponent } from './crud-zona.component';

describe('CrudZonaComponent', () => {
  let component: CrudZonaComponent;
  let fixture: ComponentFixture<CrudZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudZonaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
