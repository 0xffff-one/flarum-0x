import app from 'flarum/forum/app';
import {platformAuthenticatorIsAvailable, startAuthentication, startRegistration} from "@simplewebauthn/browser";
import {
    PublicKeyCredentialCreationOptionsJSON,
    PublicKeyCredentialRequestOptionsJSON
} from "@simplewebauthn/typescript-types";
import PasskeyAliasSetModal from "../components/PasskeyAliasSetModal";

let isPlatformAuthenticatorIsAvailable: boolean | null = null

export async function isAvailable() {
    if (isPlatformAuthenticatorIsAvailable === null) {
        isPlatformAuthenticatorIsAvailable = await platformAuthenticatorIsAvailable()
    }
    return isPlatformAuthenticatorIsAvailable
}

export async function createPasskeyCredential() {
    const resp = await app.request<PublicKeyCredentialCreationOptionsJSON>({
        url: "/authorization/passkey/registration/options",
        method: "GET"
    })
    const attResp = await startRegistration(resp)
    const registrationResp = await app.request<{
        id: string
    }>({
        url: "/authorization/passkey/registration",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: attResp
    })
    await requireSetAlias(registrationResp.id)
}

async function requireSetAlias(id: string) {
    // @ts-ignore
    app.modal.show(PasskeyAliasSetModal, {id})
}

export async function validatePasskeyCredential() {
    const resp = await app.request<PublicKeyCredentialRequestOptionsJSON>({
        url: "/authorization/passkey/assertion/options",
        method: "GET"
    })
    const asrResp = await startAuthentication(resp)
    await app.request<void>({
        url: "/authorization/passkey/assertion",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: asrResp
    })
    window.location.reload()
}
