import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  empArr: any[];
  isSidePanelOpen: boolean;
  empForm: any;
  emailPattern: any;
  phonePattern: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.empArr = [];
    this.isSidePanelOpen = false;
    this.empForm = FormGroup;
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    this.createEmpForm();
  }

  ngOnInit(): void {
    this.loadEmp();
  }

  createEmpForm() {
    this.empForm = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl(false, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
      birthDate: new FormControl(new Date(), [Validators.required]),
      role: new FormControl('', [Validators.required]),
      address: new FormGroup({
        address: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      }),
    })
  }

  onOpenSidePanel() {
    this.isSidePanelOpen = true;
  }

  onCloseSidePanel() {
    this.isSidePanelOpen = false;
    this.onReset();
  }

  loadEmp() {
    this.http.get('https://dummyjson.com/users').subscribe((res: any) => {
      if (res) {
        this.spinner.show();
        setTimeout(() => {
          this.empArr = res.users;
          this.spinner.hide();
        }, 500);
      }
    }, (err: any) => {
      this.spinner.hide();
    })
  }

  onSave() {
    if (this.empForm.value.id == 0) {
      this.http.post('https://dummyjson.com/users/add', this.empForm.value).subscribe((res: any) => {
        this.toastr.success('Saved Successfully');
        this.loadEmp();
        this.onCloseSidePanel();
      })
    }
  }

  onUpdate() {
    if (this.empForm.value.id != 0) {
      this.http.put('https://dummyjson.com/users/' + this.empForm.value.id, this.empForm.value).subscribe((res: any) => {
        this.toastr.success('Updated Successfully');
        this.loadEmp();
        this.onCloseSidePanel();
      })
    }
  }

  onEdit(id: number) {
    const record = this.empArr.find((m: any) => m.id == id);
    if (record != undefined) {
      this.empForm = new FormGroup({
        id: new FormControl(record.id),
        firstName: new FormControl(record.firstName, [Validators.required]),
        lastName: new FormControl(record.lastName, [Validators.required]),
        gender: new FormControl(record.gender, [Validators.required]),
        email: new FormControl(record.email, [Validators.required]),
        phone: new FormControl(record.phone, [Validators.required]),
        birthDate: new FormControl(record.birthDate, [Validators.required]),
        role: new FormControl(record.role, [Validators.required]),
        address: new FormGroup({
          address: new FormControl(record.address.address, [Validators.required]),
          city: new FormControl(record.address.city, [Validators.required]),
          postalCode: new FormControl(record.address.postalCode, [Validators.required]),
          state: new FormControl(record.address.state, [Validators.required]),
          country: new FormControl(record.address.country, [Validators.required]),
        })
      })
    }
    this.onOpenSidePanel();
  }

  onDelete(id: number) {
    this.http.delete('https://dummyjson.com/users/' + id).subscribe((res: any) => {
      this.toastr.error('Deleted Successfully');
      this.loadEmp();
    })
  }

  onReset() {
    this.createEmpForm();
  }

  clear(table: Table) {
    table.clear();
  }
}
