import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private titleSubject = new BehaviorSubject<string>('Users');
  private subsciptions: Subscription[] = [];

  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public refresing: boolean;



  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.getUsers(true);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public changeTitle(title:string):void{
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean): void {
    this.refresing = true;
    this.subsciptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refresing = false;
          if (showNotification) {
            this.notificationService.sendSuccessNotification(NotificationType.SUCCESS,`${response.length} users loaded sucessfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.sendSuccessNotification(NotificationType.ERROR,'ERROR');
          this.refresing = false;
        }
      )
    );
  }



}
