import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { API_ENDPOINTS } from "../config/api.endpoints";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import {JwtHelper} from 'angular2-jwt';
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public cartService: CartService) {
  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/${API_ENDPOINTS.login}`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/${API_ENDPOINTS.refresh_token}`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string) {
    const bearerToken: string = 'Bearer ';
    let backendToken = authorizationValue.substring(bearerToken.length);
    let user: LocalUser = {
      token: backendToken,
      email: this.jwtHelper.decodeToken(backendToken).sub
    };
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
