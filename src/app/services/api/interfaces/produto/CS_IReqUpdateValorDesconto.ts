import { IPVProductDiscount, IPVTenant } from "../prevenda/CS_Common_IPreVenda";

export interface IReqUpdateValueDiscount {
    pvTenant: IPVTenant,
    usuarioId: string,
    productDiscount: IPVProductDiscount
}
