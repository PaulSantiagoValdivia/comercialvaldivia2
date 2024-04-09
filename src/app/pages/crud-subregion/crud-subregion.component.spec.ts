import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSubregionComponent } from './crud-subregion.component';

describe('CrudSubregionComponent', () => {
  let component: CrudSubregionComponent;
  let fixture: ComponentFixture<CrudSubregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSubregionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudSubregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
