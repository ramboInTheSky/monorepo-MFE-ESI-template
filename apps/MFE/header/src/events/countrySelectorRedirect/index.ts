import {CountrySelectorRedirectESB} from "@monorepo/eventservice"

const redirectESB = new CountrySelectorRedirectESB()

const PublishCountrySelectorRedirect = () => {
    redirectESB.publish()
}

export const SubscribeCountrySelectorRedirect = (cb: () => void) => {
    return redirectESB.subscribe(cb)
}

export default PublishCountrySelectorRedirect
