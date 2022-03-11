# UI Performance Testing

We are using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) to run UI performance testing. Lighthouse-ci
(LHCI) is a CLI which wraps around the base
[Google Lighthouse CLI](https://github.com/GoogleChrome/lighthouse#using-the-node-cli). The configuration used in LHCI
(see below) sets the arguments which are sent to the base Lighthouse CLI.

## Quick Start

1. Open a terminal in `./lighthouse`
2. Run `npm i`
3. Run `npm run lh:collect -- --url=[ENV URL]` to run a Google Lighthouse audit
   and publish results to `./lighthouse/.lighthouseci` (folder will be created if it doesn't already exist)
4. Run `npm run lh:assert` to run assertions against the Google Lighthouse results
5. Run `npm run lh:upload` to upload results to a Lighthouse Server (If exists and is running. Currently not
   implemented)

## Header Configuration

Lighthouse is running an Accessibility audit on all available audits in Lighthouse CI except from;

- `document-title` - The is no title on the header as it inherits the title from the page the header is SSI-ed into
- `html-has-lang`, `html-lang-valid` - The lang is not in the header as it will be inherited from the page the header is
  SSI-ed into
- `video-caption`, `video-description` - The header does not include videos, so this is not required

## Configuration

There are 3 scripts related to Google Lighthouse which can be found in `./lighthouse/package.json`:

- `lh:collect` - Run tests
- `lh:assert` - Assert results
- `lh:upload` - Upload results to Lighthouse Server

The three scripts all run based on the configuration which can be found in `./lighthouse/config`.

The configuration looks like this example:

```
{
  "ci": {
    "collect": {
      "chromePath": false,
      "numberOfRuns": 3,
      "settings": {
        "extraHeaders": "{\"x-monorepo-realm\": \"Amido\", \"x-monorepo-territory\": \"GB\", \"x-monorepo-language\": \"en\"}"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }]
      }
    },
    "upload": {
      "target": "lhci",
      "token": "sometoken",
      "serverBaseUrl": "http://localhost:9001"
    }
  }
}
```

The collect json object defines how the test will be executed and against which URL. The assert json object defines the
assertions the `lh:assert` step will run. The upload json object defines the Lighthouse Server instance the results will
be uploaded to

Full details for the configuration file can be found on
[lighthouse-ci GitHub page](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md)

Details around assertions can be found on the
[lighthouse-ci GitHub page for assertions](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/assertions.md)

## Pipeline

These tests are running in the Azure Pipeline at the `deploy` stage. In order to run the tests (all three of the LHCI
scripts) you need to add the following to the deploy stage in your yaml pipeline:

```
jobs:
- template: azDevOps/azure/templates/jobs/deploy-helm.yml@AmidoEcommerce
parameters:
  lighthouse_test: true
  lighthouse_target_url: '$(appUrl)'
  lighthouse_run_budget_test: true
  upload_to_lighthouse_server: false
  lighthouse_artifact_name: 'sxeun'
```

- `lighthouse_test` _OPTIONAL_ -- Boolean flag to enable/disable running any Lighthouse testing. Defaults to `false`

- `lighthouse_target_url` _MANDATORY_ -- Url that Lighthouse runs against

- `lighthouse_run_budget_test` _MANDATORY_ -- Boolean flag to enable/disable running lighthouse budget test. Requires
  `./lighthouse/config/budget.json` to exist. Defaults to `false`.

- `lighthouse_artifact_name` - _OPTIONAL_ -- Suffix added to the folder name of the artifact. Useful if running
  Lighthouse multiple times in one deployment job

- `upload_to_lighthouse_server` - _OPTIONAL_ -- Enables uploading to Lighthouse Server (LH SERVER NOT FULLY IMPLEMENTED
  YET) -- Defaults to `false`

### Templates

The pipeline templates execute the following if `lighthouse_tests` is `true`:

- Execute `npm install` to install LHCI
- Execute `npm run lh:collect -- --url=${{parameters.lighthouse_target_url}}`
- Execute `npm run lh:assert`
- Execute `npm run lh:upload` (if `upload_to_lighthouse_server` is `true`)
- Publish the results (from `./lighthouse/.lighthouseci`) as an artifact on the pipeline
