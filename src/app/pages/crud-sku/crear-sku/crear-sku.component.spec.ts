import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSkuComponent } from './crear-sku.component';

describe('CrearSkuComponent', () => {
  let component: CrearSkuComponent;
  let fixture: ComponentFixture<CrearSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSkuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
