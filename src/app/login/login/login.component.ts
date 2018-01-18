import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //--------------这是复杂的方式--------------------
    // this.form = new FormGroup({
    //   //多个验证器  Vaildators.compose()
    //   email: new FormControl('wang@163.com', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // })

    //--------------这是简单的方式--------------------
    this.form = this.fb.group({
      //多个验证器  Vaildators.compose()   自定义表单控件也可应用在此1.this.validate
      email: ['wan@local.dev', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    // 自定义表单控件也可应用在此2.this.validate
    // if(){....}
    // this.form.controls['email'].setValidators(this.validate);
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotVaild: 'The email must start with wang'
    }
  }
}
