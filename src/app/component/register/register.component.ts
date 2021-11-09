import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subsciptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.showLoading = false
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegister(user: User): void{
    //check for empty spaces + whitespace and propper formatting
    this.showLoading = true;
    this.subsciptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new user was created for ${response.firstName}. Please check your email.`);
          this.router.navigateByUrl('/login');
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,httpErrorResponse.error.message );
          this.showLoading = false;
        }
      )
    );
  }
  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType,message);
    } else {
      this.notificationService.notify(notificationType,'AN ERROR OCCURED');
    }
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach(sub => sub.unsubscribe());
  }

}
