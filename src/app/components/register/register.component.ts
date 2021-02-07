import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {ResponseBodyStatus} from '../utils/endpoint.types';
import {DataService} from '../dataservice/data-service.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['entry-list/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            invitationCode: ['', Validators.required]
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

        this.dataService.register(this.registerForm.value).subscribe(response => {
            if (response.status === ResponseBodyStatus.OK) {
                alert('Registration successful');
                this.router.navigate(['/login']);
            } else if (response.status === ResponseBodyStatus.FAIL) {
                alert(response.errorCode + ' - ' + response.message);
                this.loading = false;
                console.log('Error code:' + response.errorCode);
                console.log('Error message:' + response.message);
            }
        });
    }
}
