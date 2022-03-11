export interface VisitorTokenCallbackContractModel {
    data: SessionResponse;
}
export interface VisitorTokenContractModel {
    consent: string[];
}
export interface VisitorTokenUpgradeContractModel {
    identityToken: string;
    consent: string[];
}
export interface Visitor {
    id: string;
    state: string;
}
export interface Consent {
    essential_cookies: boolean;
    functional_cookies: boolean;
    performance_cookies: boolean;
    marketing_cookies: boolean;
}
export interface VisitorInfo {
    aud: string;
    client_id: string;
    consent: Consent;
    exp: number;
    iat: number;
    iss: string;
    nbf: number;
    sub: string;
    visitor: Visitor;
}
export interface SessionResponse {
    visitorInfo: VisitorInfo;
    visitorToken: string;
}
