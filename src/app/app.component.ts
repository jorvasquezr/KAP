import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user ={
    imageURL:"http://imagenesparacelulares.net/wp-content/uploads/2016/05/imagenes-de-gatos-para-perfil-whatsapp6.jpg",
    name:"Fernanda Ruiz"
  }
  
  public menu =   
    [  
    { 
    title : 'Acreditaciones',
    url   : '/accreditations',
    icon  : 'book-outline' 
    },
    { 
      title : 'Mis acreditaciones',
      url   : '/contacts',
      icon  : 'book-outline' 
      },
    { 
    title : 'Tutorial',  
    url   : '/tutorial-acreditador',  
    icon  : 'document-outline'  
    }]
  public cuenta= [   
    {  
    title : 'Configuración',  
    url   : '/user-settings',  
    icon  : 'settings-outline'   
    },  
    {  
    title : 'Logout',  
    url   : '/inicio',  
    icon  : 'log-out-outline'  
    }
    ];  
  public cambiarUsr ={
    title : 'Cambiar a Acreditador',
    icon  : 'person-outline'
    }
  public crearAcreditacion = {
    title : 'Crear Acreditación',  
    url   : '/crear-acreditacion',  
    icon  : 'add-outline'  
  }
  private acreditador = true;
  protected menuName = "Acreditador";
  protected tutorial

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  cambiarUsuario(){
    if(this.acreditador){
      this.cambiarUsr.title='Cambiar a Acreditador';
      this.menuName='Aspirante';
      this.menu.find(element => element.title == "Tutorial").url="/tutorial-aspirante"
      this.navCtrl.navigateRoot(['/tutorial-aspirante']);
      this.acreditador = false;
      }
     
      else{
          this.cambiarUsr.title='Cambiar a Aspirante';
          this.menuName='Acreditador'
          this.menu.find(element => element.title == "Tutorial").url="/tutorial-acreditador"
          this.navCtrl.navigateRoot(['/tutorial-acreditador']);
          this.acreditador=true
      }

    }

    


  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }
}
