import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { API_ENDPOINTS } from "../../config/api.endpoints";
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id: string, page : number = 0, linesPerPage : number = 10) {
    return this.http.get(`${API_CONFIG.baseUrl}/${API_ENDPOINTS.produtosPaginado}?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }

  findById(produto_id: string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/${API_ENDPOINTS.produtos}/${produto_id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
}
