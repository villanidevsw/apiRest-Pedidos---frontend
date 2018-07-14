import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { API_ENDPOINTS } from "../../config/api.endpoints";

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage: StorageService) {
  }

  findById(id: string): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/${API_ENDPOINTS.clientes}/${id}`);
  }

  findByEmail(email: string): Observable<ClienteDTO> {
    //movido para o auth interceptor
    /*let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseUrl}/${API_ENDPOINTS.clientes}/email?value=${email}`,
      { 'headers': authHeader });*/

    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/${API_ENDPOINTS.clientes}/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(cliente: ClienteDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/${API_ENDPOINTS.clientes}`,
      cliente,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  /*uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseUrl}/${API_ENDPOINTS.clientes}/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }*/
}