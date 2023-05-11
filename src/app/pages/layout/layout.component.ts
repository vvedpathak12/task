import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want log out?',
      accept: () => {
        sessionStorage.removeItem('username');
        this.toastr.success('Logged Out Successfully');
        this.router.navigate(['/login']);
      },reject: () => {
        this.toastr.warning('Logging Out Cancelled');
      }
    });
  }

}
