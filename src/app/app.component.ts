import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gv-smart-community-client'; 

  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('sidenav', null) sidenav: MatSidenav;

  reason = '';

  constructor(private shared: SharedService) {
    this.getVillages();
  }

  getVillages() {
    this.shared.getVillages().subscribe(res => {
      this.shared.villages.next(res['villages']);
    })
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
