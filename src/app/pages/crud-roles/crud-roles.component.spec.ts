import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRolesComponent } from './crud-roles.component';

describe('CrudRolesComponent', () => {
  let component: CrudRolesComponent;
  let fixture: ComponentFixture<CrudRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
