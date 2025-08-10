import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInfo } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { TelegramApi } from '../../config/config';
import { ActivatedRoute } from '@angular/router';

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
    private userService: UserService,
    private route: ActivatedRoute 
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
      ]]
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const user :UserInfo = {
        first_name: this.firstName?.value|| "",
        last_name: this.lastName?.value|| "",
      }

      this.userService.registerUser(user).subscribe({
      next: (response) => {
        const workoutID = Number(this.route.snapshot.queryParamMap.get('workoutId'));
        console.log(workoutID)
        var type = ""
        if (workoutID == 0) {
          type = "connect";
        } else{
          type = "workout";
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
