import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  authSUForm: FormGroup;
  codeForm: FormGroup;
  submitted: boolean = false;
  showCode: boolean = false;
  username = '';
  loggedIn = false;


  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {}



  ngOnInit() {
    this.buildForm();
    Auth.currentAuthenticatedUser()
      .then(user2 => {
        console.log(user2);
        if (user2) {
            this.loggedIn = true;
        }
      }).catch(err => console.log(err));
  }

  get f() { return this.authSUForm.controls; }
  get f2() { return this.codeForm.controls; }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  buildForm() {
    this.authSUForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
    });

    this.codeForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  onSubmit() {

    if (this.authSUForm.invalid) { return null; }
    this.username = this.authSUForm.value['email'];

    Auth.signUp({
         username: this.authSUForm.value['email'],
         password: this.authSUForm.value['password'],
        attributes: {
          email: this.authSUForm.value['email']
       },
    }).then(data => {
      console.log(data);
      this.showCode = true;
    }).catch(err => {
      console.log(err);
      if ( err.code === 'UsernameExistsException' ) {
        this.showCode =  true;
      }
    });

  }

  confirmCode() {
    if (this.codeForm.invalid) { return null; }
    console.log(this.codeForm.value);
    Auth.confirmSignUp(this.username, this.codeForm.value['code'])
      .then(data => {
        console.log(data);
        this.modalRef.hide();
    }).catch(err => console.log(err));
  }

  onSubmitLogin() {
    if (this.authSUForm.invalid) { return null; }
    Auth.signIn(this.authSUForm.value['email'], this.authSUForm.value['password'])
      .then(user => {
        console.log(user);
        Auth.currentAuthenticatedUser()
          .then(user2 => {
            this.loggedIn = true;
            console.log(user2);
            this.modalRef.hide();
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }

  signOut() {
    Auth.signOut()
      .then(data => {
        console.log(data);
        this.loggedIn = false;
    }).catch(err => console.log(err));
  }

}
