import { Component, OnInit } from '@angular/core';
import { RegService } from './../../services/reg.service';
import { AuthChecker, LOGIN } from 'src/Logins';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passAuthCheck: boolean = false;
  listofUsers: AuthChecker[] = []

  constructor(private regService: RegService) { }
  k: LOGIN[] = [];
  login: LOGIN[] = [];


  user: string = '';
  pass: string = '';

  //declare variable for the url path string 
  pathtoGo: string = '/login';

  //declare object with default username and password 
  ngOnInit(): void {
    this.regService
      .getLogins()
      .subscribe((listReturn) => {
        this.login = listReturn
        
        })

      for (let i = 0; i < this.login.length; i++) {
        let r = {
          user: this.login[i].user,
          password: this.login[i].password
        }
        console.log(this.listofUsers.push(r));
      }

      }
  

  

  //function to be implemented on submitting the admin login form
  //check that login details are correct and update pathtoGo to url for registered component.
  onSubmit() {
    
        if(this.passAuthCheck) {
            alert('Login successful.')
          } else {
            alert('Provide correct login details for your account.')
          }
          
        

    
  }

  checkEntries() {
    console.log(this.listofUsers)
      if(this.listofUsers.includes({user: this.user, password: this.pass})) {
          this.passAuthCheck = true
          this.pathtoGo = '/regList'
        } 
      console.log(this.passAuthCheck)
  
  
  }

}