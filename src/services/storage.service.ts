import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { CartDTO } from "../models/cart.dto";

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }
    else {
      return JSON.parse(user);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): CartDTO {
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str != null) {
      return JSON.parse(str);
    }
    else {
      return null;
    }
  }

  setCart(obj: CartDTO) {
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }
    else {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }
}
