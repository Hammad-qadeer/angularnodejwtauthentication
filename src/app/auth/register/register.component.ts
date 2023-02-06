import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  confirmPassword = true;

  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    cnic: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

    public showSuccess(): void {
    this.toastrService.success('Your registration is successful!');
  }
  

  onSubmit(): void {
    debugger
    const { username, email, phone, cnic, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      this.isSignUpFailed = true;
      return;
    }

    this.authService.register(username!, email!, phone!, cnic!, password!, confirmPassword!).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.showSuccess();
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
