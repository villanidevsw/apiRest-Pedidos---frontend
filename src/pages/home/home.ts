import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  //eventos de página
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    // por causa do lazy load posso passar a string com o nome
    // do componente da página
    // o push empilha uma página em cima da outra e exibe
    // o botao de voltar
    //this.navCtrl.push('CategoriasPage');

    this.navCtrl.setRoot('CategoriasPage');
  }
}
