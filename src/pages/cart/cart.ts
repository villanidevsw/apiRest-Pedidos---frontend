import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CartItemDTO } from "../../models/cart-item.dto";
import { ProdutoService } from "../../services/domain/produto.service";
import { API_CONFIG } from "../../config/api.config";
import { CartService } from "../../services/domain/cart.service";
import { ProdutoDTO } from "../../models/produto.dto";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  items: CartItemDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService
  ) {}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(
        response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.produto.id
          }-small.jpg`;
        },
        error => {}
      );
    }
  }

  removeProduto(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseProdutoQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseProdutoQuantity(produto).items;
  }

  decreaseProdutoQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseProdutoQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOnShopping(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
