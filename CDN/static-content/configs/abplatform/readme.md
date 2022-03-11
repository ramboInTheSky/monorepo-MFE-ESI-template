# AB Testing

## Running Locally

For this to work locally, they're a certain amount of pre-requisites:

- OS Hosts file needs the following:

```
127.0.0.1 test.ab.localhost
127.0.0.1 test2.ab.localhost
127.0.0.1 test3.ab.localhost
127.0.0.1 test4.ab.localhost
```

- Local will use the _plain_ `abplatformconfig.js`
- In that config, `isLocalHost` needs to be true, and other configs need to be accurate and relevant e.g. primary,
  secondary, etc

## On an env

For this to work on an environment, they're a certain amount of pre-requisites:

- The header feature settings needs to be true.
- The environment needs to be set up in the
  [NGINX Dictionaries](https://dev.azure.com/Amido.Ecommerce.Infrastructure/_git/Amido.Ecommerce.Infrastructure.NginxDictionary?version=GBmaster)
- The environment needs a `abplatformconfig.js`
- In that config, `isLocalHost` needs to be false, `ABCTesting` needs to be true, and other configs need to be accurate
  and relevant e.g. primary, secondary, etc
- Ideally, the MVC config in DomainConfig.xml needs disabling

## Header Feature Setting

To load the scripts, the following setting needs to be enabled in `../../../../apps/mfe/header/featuresettings.json`.

It is a Next GB only feature.

```
      "Amido.Ecommerce.header.frontend.abPlatformTesting.enabled": {
        "Value": false
      }
```

## Cache Clear URLs

To be automated in #34735

- `{siteurl}`/static-content/configs/abplatform/`{siteurl}`-abplatformconfig.js
- `{siteurl}`/static-content/configs/abplatform/abplatform.js

## ENVs Currently Configured

_Please add envs here if you are configuring additional envs._

### SX

- [sxeun-test.amido.com](https://sxeun-test.amido.com)
- [sxeun-test2.amido.com](https://sxeun-test2.amido.com)
- [sxeun-test3.amido.com](https://sxeun-test3.amido.com)
- [sxeun-test4.amido.com](https://sxeun-test4.amido.com)

- [sxeuw-test.amido.com](https://sxeuw-test.amido.com)
- [sxeuw-test2.amido.com](https://sxeuw-test2.amido.com)
- [sxeuw-test3.amido.com](https://sxeuw-test3.amido.com)
- [sxeuw-test4.amido.com](https://sxeuw-test4.amido.com)

- [sx-test.amido.com](https://sx-test.amido.com)
- [sx-test2.amido.com](https://sx-test2.amido.com)
- [sx-test3.amido.com](https://sx-test3.amido.com)
- [sx-test4.amido.com](https://sx-test4.amido.com)

QA

- [qaeun-test.amido.com](https://qaeun-test.amido.com)
- [qaeun-test2.amido.com](https://qaeun-test.amido.com)
- [qaeun-test3.amido.com](https://qaeun-test.amido.com)
- [qaeun-test4.amido.com](https://qaeun-test.amido.com)

- [qaeuw-test.amido.com](https://qaeuw-test.amido.com)
- [qaeuw-test2.amido.com](https://qaeuw-test2.amido.com)
- [qaeuw-test3.amido.com](https://qaeuw-test3.amido.com)
- [qaeuw-test4.amido.com](https://qaeuw-test4.amido.com)

- [qa-test.amido.com](https://qa-test.amido.com)
- [qa-test2.amido.com](https://qa-test2.amido.com)
- [qa-test3.amido.com](https://qa-test3.amido.com)
- [qa-test4.amido.com](https://qa-test4.amido.com)

CI

- [cieun-test.amido.com](https://cieun-test.amido.com)
- [cieun-test2.amido.com](https://cieun-test2.amido.com)
- [cieun-test3.amido.com](https://cieun-test3.amido.com)
- [cieun-test4.amido.com](https://cieun-test4.amido.com)

- [cieuw-test.amido.com](https://cieuw-test.amido.com)
- [cieuw-test2.amido.com](https://cieuw-test2.amido.com)
- [cieuw-test3.amido.com](https://cieuw-test3.amido.com)
- [cieuw-test4.amido.com](https://cieuw-test4.amido.com)

- [ci-test.amido.com](https://ci-test.amido.com)
- [ci-test2.amido.com](https://ci-test2.amido.com)
- [ci-test3.amido.com](https://ci-test3.amido.com)
- [ci-test4.amido.com](https://ci-test4.amido.com)

PP

- [ppeun-test.amido.com](https://ppeun-test.amido.com)
- [ppeun-test2.amido.com](https://ppeun-test2.amido.com)
- [ppeun-test3.amido.com](https://ppeun-test3.amido.com)
- [ppeun-test4.amido.com](https://ppeun-test4.amido.com)

- [ppeuw-test.amido.com](https://ppeuw-test.amido.com)
- [ppeuw-test2.amido.com](https://ppeuw2-test.amido.com)
- [ppeuw-test3.amido.com](https://ppeuw3-test.amido.com)
- [ppeuw-test4.amido.com](https://ppeuw4-test.amido.com)

- [pp-test.amido.com](https://pp-test.amido.com)
- [pp-test2.amido.com](https://pp-test2.amido.com)
- [pp-test3.amido.com](https://pp-test3.amido.com)
- [pp-test4.amido.com](https://pp-test4.amido.com)

UAT

- [uk-uat23.test.ecomm.systems.next](https://uk-uat23.test.ecomm.systems.next)
- [uk2-uat23.test.ecomm.systems.next](https://uk2-uat23.test.ecomm.systems.next)
- [uk3-uat23.test.ecomm.systems.next](https://uk3-uat23.test.ecomm.systems.next)
- [uk4-uat23.test.ecomm.systems.next](https://uk4-uat23.test.ecomm.systems.next)

Conv

- [conv.amido.com](https://conv.amido.com)
- [conv2.amido.com](https://conv2.amido.com)
- [conv3.amido.com](https://conv3.amido.com)
- [conv4.amido.com](https://conv4.amido.com)

### ~~PROD~~

- ~~www.amido.com~~
- ~~www2.amido.com~~
- ~~www3.amido.com~~
- ~~www4.amido.com~~
