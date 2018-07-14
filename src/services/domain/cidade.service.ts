import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { API_ENDPOINTS } from "../../config/api.endpoints";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

    findAll(estado_id : string) : Observable<CidadeDTO[]>  {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/${API_ENDPOINTS.estados}/${estado_id}/${API_ENDPOINTS.cidades}`);
    }
}
