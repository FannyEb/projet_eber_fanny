import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/model/notification';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  isSuccess: boolean = false;
  isWarning: boolean = false;
  isError: boolean = false;

  message: string = '';

  constructor(private service: NotificationService) { }

  ngOnInit(): void {

    this.service.notification
      .subscribe(notification => {
        if (notification) this.render(notification);
      });
  }

  private render(notification: any) {
    this.isSuccess = notification.type === NotificationType.Success;
    this.isWarning = notification.type === NotificationType.Warning;
    this.isError = notification.type === NotificationType.Error;
    this.message = notification.message;
    setTimeout(() => {
      this.isSuccess = false;
      this.isWarning = false;
      this.isError = false;
    }
      , notification.duration);

  }

}
