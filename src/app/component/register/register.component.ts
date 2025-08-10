import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistrationInfo } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { TelegramApi } from '../../config/config';

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
    private userService: UserService  
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
      workout: [''] 
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get workout(){ return this.registerForm.get('workout'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const user :UserRegistrationInfo = {
        first_name: this.firstName?.value|| "",
        last_name: this.lastName?.value|| "",
      }

      this.userService.registerUser(user).subscribe({
      next: (response) => {
        const workoutID = this.workout?.value||undefined
        console.log(workoutID)
        var type = ""
        if (workoutID == undefined) {
          type = "instr";
        } else{
          type = "event";
        }
        window.location.href = `${TelegramApi.url}/${TelegramApi.nameBot}?start=${type}=${workoutID}_id=${response.id}`;

      },
      error: (err) => console.error('Registration error:', err),
    });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched || this.submitted);
  }
}
