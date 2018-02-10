import { Component, Input, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { User } from '../../domain/user.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true;
  @Input() placeholderText = '请输入成员 email';
  @Input() label = '添加/修改成员';
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable<User[]>;
  private propagateChange = (_: any) => { };

  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }
  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => ({ ...e, c }), {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if(obj && !this.multiple){
      this.items = [...obj];
    }
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  };

  registerOnTouched(fn: any): void { };

  validate(c: FormControl): { [key: string]: any } {//做自定义表单控件整个的验证
    return this.items ? null : {
      chipListInvalid: true
    }
  }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({ memberSearch: member.name });
    this.propagateChange(this.items);
  }

  //input框显示的值
  displayUser(user: User): string {
    return user ? user.name : '';
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }
}
