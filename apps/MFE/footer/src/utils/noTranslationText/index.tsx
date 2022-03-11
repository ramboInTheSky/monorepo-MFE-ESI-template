export default function noTranslationText(text: string) {
    return {__html: `<!--mp_trans_disable_start-->${text}<!--mp_trans_disable_end-->`}
}
