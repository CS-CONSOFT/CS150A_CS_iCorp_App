import { IResPaymentFormById } from "./CS_IResPaymentFormById";
import { IResPaymentFormWithFixCondition } from "./CS_IResPaymentFormWithFixCondition";

/**
 * Encapsula os dois retornos, com condicao fixa e sem condicao fixa
 */
export interface IResPaymentFormByIdComplete {
    formByIdWithConditions?: IResPaymentFormById,
    formByIdWithFixedConditions?: IResPaymentFormWithFixCondition
}