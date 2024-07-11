import { IPVProductDiscount, IPVTenant } from "../prevenda/CS_Common_IPreVenda";

export interface IReqUpdatePercentageDiscount {
    pvTenant: IPVTenant,
    usuarioId: string,
    productDiscount: IPVProductDiscount
}