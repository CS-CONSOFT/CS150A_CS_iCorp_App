export interface ICommonResponse {
    IsOk: boolean,
    Msg: string,
    Key?: string,
}

export interface ICommonReq {
    Tenant_id: number,
    In_IsActive: boolean,
    In_IsCount: number,
    in_currentPage: number,
    in_pageSize: number,
}

