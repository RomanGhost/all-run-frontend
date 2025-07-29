import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistrationInfo } from '../../model/user.model';
import { SchedulerView } from '../../model/scheduler.view-model';
import { SchedulerService } from '../../service/scheduler.service';
import { UserService } from '../../service/user.service';

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
  schedulerOptions: SchedulerView[] = [];

  constructor(
    private fb: FormBuilder,
    private schedulerService: SchedulerService,
    private userService: UserService  
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSchedulers();
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
      scheduler: [''] // ➕ добавлено
    });
  }

  private loadSchedulers(): void {
    this.schedulerService.getSchedulers().subscribe(slots => {
      this.schedulerOptions = slots.filter(slot => !slot.isFull);
    });

    console.log(this.schedulerOptions);
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get scheduler(){ return this.registerForm.get('scheduler'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const user :UserRegistrationInfo = {
        first_name: this.firstName?.value||"",
        last_name: this.lastName?.value||"",
      }

      this.userService.registerUser(user).subscribe({
      next: (response) => {
        const schedulerID = this.scheduler?.value
        window.location.href = `https://t.me/all_run_bot?start=event=${schedulerID}_id=${response.id}`;

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
