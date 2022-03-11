type IEDOCUMENT = Document & {documentMode}

export const isIE = () => !!(document as IEDOCUMENT).documentMode
