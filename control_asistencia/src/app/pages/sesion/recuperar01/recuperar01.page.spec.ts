import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recuperar01Page } from './recuperar01.page';

describe('Recuperar01Page', () => {
  let component: Recuperar01Page;
  let fixture: ComponentFixture<Recuperar01Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Recuperar01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
