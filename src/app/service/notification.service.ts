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

  public sendDefaultNotification(message: string) {
    if (message) {
      this.notify(NotificationType.DEFAULT,message);
    } else {
      this.notify(NotificationType.ERROR,'AN ERROR OCCURED');
    }
  }

  public sendSuccessNotification(message: string) {
    if (message) {
      this.notify(NotificationType.SUCCESS,message);
    } else {
      this.notify(NotificationType.ERROR,'AN ERROR OCCURED');
    }
  }

  public sendInfoNotification(message: string) {
    if (message) {
      this.notify(NotificationType.INFO,message);
    } else {
      this.notify(NotificationType.ERROR,'AN ERROR OCCURED');
    }
  }

  public sendWarningNotification(message: string) {
    if (message) {
      this.notify(NotificationType.WARNING,message);
    } else {
      this.notify(NotificationType.ERROR,'AN ERROR OCCURED');
    }
  }

  public sendErrorNotification(message: string) {
    if (message) {
      this.notify(NotificationType.ERROR,message);
    } else {
      this.notify(NotificationType.ERROR,'AN ERROR OCCURED');
    }
  }




}
