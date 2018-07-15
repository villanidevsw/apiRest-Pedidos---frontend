import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_ENDPOINTS } from "../../config/api.endpoints";

@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {
    }

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/${API_ENDPOINTS.pedidos}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
