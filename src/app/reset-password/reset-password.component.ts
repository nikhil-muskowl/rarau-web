import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormServiceService } from '../services/form-service.service';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public user_id;
  public passForm: FormGroup;
  public heading = 'Reset Password';


  public responseData;

  public status;
  public messageTitle;
  public message;

  public passconf;
  public password;

  public formErrors = {
    passconf: '',
    password: '',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formService: FormServiceService,
    private resetPasswordService: ResetPasswordService
  ) {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    console.log(this.user_id);
    this.createForm();
  }
  public createForm() {
    this.passForm = this.formBuilder.group({
      password: [this.password,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
      ])],
      passconf: [this.passconf,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
      ])],
    });

    this.passForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.passForm, this.formErrors, true)
    });
  }


  public onSubmit() {
    this.messageTitle = '';
    // mark all fields as touched
    this.formService.markFormGroupTouched(this.passForm);
    if (this.passForm.valid) {

      var formData = {
        user_id: this.user_id,
        password: this.passForm.value.password,
        passconf: this.passForm.value.passconf
      }

      this.resetPasswordService.updatePassword(formData).subscribe(
        response => {
          this.responseData = response;

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {
                if (element.id == 'passconf') {
                  this.formErrors.passconf = element.text
                }
                if (element.id == 'password') {
                  this.formErrors.password = element.text
                }
              });
            }
          } else {
            this.messageTitle = 'Sucess!';
            this.passForm.reset();
          }

        },
        err => {
          console.error(err);
        }
      );

    } else {
      this.formErrors = this.formService.validateForm(this.passForm, this.formErrors, false);
    }
  }
  ngOnInit() {
  }

}
