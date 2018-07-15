import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { CartDTO } from '../../models/cart.dto';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

  constructor(public storage: StorageService) {
  }

  createOrClearCart(): CartDTO {
    let cart: CartDTO = { items: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): CartDTO {
    let cart: CartDTO = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): CartDTO {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position == -1) {
      cart.items.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO): CartDTO {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseProdutoQuantity(produto: ProdutoDTO): CartDTO {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseProdutoQuantity(produto: ProdutoDTO): CartDTO {
    let cart = this.getCart();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items[position].quantidade--;
      if (cart.items[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart = this.getCart();
    let sum = 0;
    for (let i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }

    return sum;
  }

}
