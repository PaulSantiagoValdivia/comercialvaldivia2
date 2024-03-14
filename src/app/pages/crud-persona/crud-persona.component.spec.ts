import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPersona } from './crud-persona.component';

describe('CrudPersona', () => {
  let component: CrudPersona;
  let fixture: ComponentFixture<CrudPersona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPersona]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPersona);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
