import { ProdutoDTO } from "./produto.dto";

export interface CartItemDTO {
    quantidade: number,
    produto: ProdutoDTO
}
