import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {



  constructor( private notifier: NotifierService ) { }


  public notify( type: NotificationType, message: string ){
    this.notifier.notify(type,message);
  }


  public sendSuccessNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notify(notificationType,message);
    } else {
      this.notify(notificationType,'AN ERROR OCCURED');
    }
  }
}
