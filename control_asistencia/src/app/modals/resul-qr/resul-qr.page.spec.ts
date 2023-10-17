import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResulQrPage } from './resul-qr.page';

describe('ResulQrPage', () => {
  let component: ResulQrPage;
  let fixture: ComponentFixture<ResulQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResulQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
