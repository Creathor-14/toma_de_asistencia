import {  TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HelperService } from './helper.service';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';

describe('HelperService', () => {
  let service: HelperService;
  let alertController: AlertController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
        HelperService,
        LoadingController,
        ToastController,
        ModalController,
      ],
    });

    service = TestBed.inject(HelperService);
    alertController = TestBed.inject(AlertController);
  });

  it('show alert', fakeAsync(async () => {
    const alertTitle = 'Test Alert';
    const alertMessage = 'This is a test alert';

    spyOn(alertController, 'create').and.callThrough();

    const alert = await service.showAlert(alertMessage, alertTitle);

    expect(alertController.create).toHaveBeenCalledWith({
      cssClass: 'alertClass',
      message: alertMessage,
      header: alertTitle,
      buttons: ['Aceptar']
    });
    
    expect(alert.present).toHaveBeenCalled();
  }));
});
