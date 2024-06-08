import { IPVProductDiscount, IPVTenant } from "../prevenda/CS_Common_IPreVenda";

export interface IReqUpdatePercentageDiscount {
    pvTenant: IPVTenant,
    productDiscount: IPVProductDiscount
}