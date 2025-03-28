import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistrationInfo } from '../../model/user.model';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.pattern('^[А-Яа-яЁёA-Za-z]+$')
      ]],
      lastName: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.pattern('^[А-Яа-яЁёA-Za-z]+$')
      ]],
      telegramLogin: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(32), 
        Validators.pattern('^[a-zA-Z][\\w\\d]{4,31}$')
      ]],
      phone: ['', [
        Validators.pattern('^((8|\\+7)[\\- ]?)?\\(?\\d{3}\\)?[\\- ]?[\\d\\- ]{7,10}$')
      ]]
    });
  }

  // Getters for easy form control access
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get telegramLogin() { return this.registerForm.get('telegramLogin'); }
  get phone() { return this.registerForm.get('phone'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const userData: UserRegistrationInfo = this.registerForm.value;
      console.log(userData);
      
      this.registerService.registerUser(userData)
        .subscribe({
          next: (response) => {
            console.log('Регистрация успешна', response);
            // Reset form after successful submission
            this.registerForm.reset();
            this.submitted = false;
            // TODO: Add success notification or navigation
          },
          error: (error) => {
            console.error('Ошибка регистрации', error);
            // TODO: Add error handling and user notification
          }
        });
    }
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched || this.submitted);
  }
}