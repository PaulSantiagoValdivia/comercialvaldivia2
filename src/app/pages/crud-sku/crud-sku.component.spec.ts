import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSkuComponent } from './crud-sku.component';

describe('CrudSkuComponent', () => {
  let component: CrudSkuComponent;
  let fixture: ComponentFixture<CrudSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSkuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
