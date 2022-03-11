export interface GeneralContractModel {
    eventId?: string
}

export interface GeneralCallbackContractModel {
    success: boolean
    data: any
    status: number
    textStatus: string
    eventId?: string
}
