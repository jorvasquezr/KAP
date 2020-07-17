import { Injectable } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { rejects } from 'assert';
import { BlockchainService } from './blockchain/blockchain.service';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sesion = window.localStorage;
  loggedIn:boolean = false;

  constructor(private blockChain: BlockchainService) { 
    if(!blockChain.terminado){
      blockChain.initContracts().then(() => this.getUsuarios());
    } else {
      this.getUsuarios();
    }
    let user = JSON.parse( this.sesion.getItem("user") ) as User
    if(user){
      this.loggedIn = true
      this.actualUser = user;
    } 
  }

  private async getUsuarios() {
    this.users = await this.blockChain.getUsuarios();
  }

  private users :  User[]= [
    {
      first_name : "hola",
      last_name : "hola",
      cedula : "12345678",
      telefono : "12345678",
      email: "hola@gmail.com",
      password: "password",
      redes : [""]
    }

  ]
  public acreditador=false;
  public actualUser : User = 
  {
    first_name : "hola",
    last_name : "hola",
    cedula : "12345678",
    telefono : "12345678",
    email: "hola@gmail.com",
    password: "password",
    redes : [""]
  };


  login(email:string,password:string){
    return new Promise((resolve,rejected)=>{
      const user = {
        ...this.users.find(user=>
          user.email === email && user.password === password
        )
      }
      this.actualUser = user;
      this.sesion.setItem("user",JSON.stringify(user));
      if (Object.keys(user).length === 0){
        rejected(null);
      }
      resolve(user);


    })
  }

  register(fName: string, lName: string,cedula: string, telefono : string, email: string, password: string) {
    let newUser = {
      first_name :fName,
      last_name :lName,
      cedula,
      telefono,
      email,
      password,
      redes : [""]
    }
    this.users.push(newUser);
    this.blockChain.agregarUsuario(newUser);
  }

  actualizarUser(fName: string, lName: string,email: string, telefono : string,redes : string , password: string, cedula: string){
    this.actualUser = {
      first_name :fName,
      last_name :lName,
      cedula,
      telefono,
      email,
      password,
      redes : [redes]
    }
    /*
    const i = this.users.findIndex(user=>
      user.cedula === cedula
    )
    delete this.users[i];
    this.users.push( this.actualUser);*/
      

  }

  
}

