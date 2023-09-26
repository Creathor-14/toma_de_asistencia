import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APage } from './a.page';

describe('APage', () => {
  let component: APage;
  let fixture: ComponentFixture<APage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(APage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
