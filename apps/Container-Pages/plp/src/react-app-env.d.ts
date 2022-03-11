// / <reference types="express" />
// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />
import * as React from 'react'
import Theme from "../models/theme"

declare module 'express-serve-static-core' {
    interface Request {
      siteUrl: {
          url: string
          token: string
      }
      themeVersion: string
      theme: Theme
      html: string
    }
  }

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PORT: string;
    readonly ASSETS_PATH: string;
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
    const src: string
    export default src
}

declare module '*.svg' {
  
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

interface StringMap {
  [s: string]: string;
}
