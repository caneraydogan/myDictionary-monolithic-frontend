import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {ResponseBodyStatus} from '../utils/endpoint.types';
import {DataService} from '../dataservice/data-service.component';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private dataService: DataService
    ) {
        // redirect to home if already logged in
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['login/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            userUUId: [this.authenticationService.currentUserValue.userUUId],
            firstName: [this.authenticationService.currentUserValue.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
            lastName: [this.authenticationService.currentUserValue.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
            email: [this.authenticationService.currentUserValue.email, Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    // convenience getter for easy access to form fields
    get attribute() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.dataService.updateUser(this.registerForm.value).subscribe(response => {
                if (response.status === ResponseBodyStatus.OK) {
                    this.authenticationService.logout();
                    alert('Update successful');
                    this.authenticationService.login(this.registerForm.value.email, this.registerForm.value.password)
                        .pipe(first())
                        .subscribe(
                            data => {
                                location.reload();
                            });
                } else if (response.status === ResponseBodyStatus.FAIL) {
                    alert(response.errorCode + ' - ' + response.message);
                    console.log('Error code:' + response.errorCode);
                    console.log('Error message:' + response.message);
                }
            }
        );
        this.loading = false;
    }
}
