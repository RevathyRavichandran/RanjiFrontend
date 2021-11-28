import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AppService } from "../app.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  userForm = this.fb.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    email: ["", Validators.required],
    mobile: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    if (this.data?.id) {
      this.appService.updateUser(this.userForm.value, this.data.id).subscribe(
        (res) => {
          this.dialogRef.close(true);
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else {
      this.appService.createUser(this.userForm.value).subscribe(
        (res) => {
          this.dialogRef.close(true);
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data?.id) {
      this.appService.getUserById(this.data.id).subscribe(
        (res) => {
          let { _id, __v, ...val } = res;
          this.userForm.setValue(val);
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }
}
