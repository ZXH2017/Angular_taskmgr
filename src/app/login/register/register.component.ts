import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dataOfBirth:[],
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if(!valid){
      return;
    }
    console.log(value);
  }

}
