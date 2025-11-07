import { Directive, AfterViewInit, Input} from '@angular/core';
import { User } from '../services/user';
import { Subscriber } from 'rxjs';

@Directive({
  selector: '[appAuth]'
})
export class Auth implements AfterViewInit {

  @Input() appAuth: undefined
  constructor(private userService: User) { }
  ngAfterViewInit(): void {
      this.userService.authStatus.subscribe((isLogueado)=>{
        if (isLogueado){
          console.log("si esta logueado")
        }else{
          console.log("nno esta logueado")

        }
      })
  }

}
