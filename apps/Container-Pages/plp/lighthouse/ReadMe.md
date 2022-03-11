# UI Performance Testing

We are using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) to run UI performance testing. Lighthouse-ci
(LHCI) is a CLI which wraps around the base
[Google Lighthouse CLI](https://github.com/GoogleChrome/lighthouse#using-the-node-cli). The configuration used in LHCI
(see below) sets the arguments which are sent to the base Lighthouse CLI.

## Quick Start

1. Open a terminal in `./lighthouse`
2. Run `npm i`
3. Update the file `./config/non-production_config.json` to replace `#{lh_test_target_domain}#` with an environment
   domain
4. Run `npm run lh:collect -- --config=./config/non-production_config.json` to run a Google Lighthouse audit and publish
   results to `./lighthouse/.lighthouseci` (folder will be created if it doesn't already exist)
5. Run `npm run lh:assert -- --config=./config/non-production_config.json` to run assertions against the Google
   Lighthouse results
6. Run `npm run lh:upload -- --config=./config/non-production_config.json` to upload results to a Lighthouse Server (If
   exists and is running. Currently not implemented)

## PLP Configuration

Lighthouse is running an Accessibility audit on all available audits in Lighthouse CI except from;

- `video-caption`, `video-description` - The PLP does not include videos, so this is not required

## Configuration

There are 3 scripts related to Google Lighthouse which can be found in `./lighthouse/package.json`:

- `lh:collect` - Run tests
- `lh:assert` - Assert results
- `lh:upload` - Upload results to Lighthouse Server

The three scripts all run based on the configuration which can be found in `./lighthouse/config`.

The configuration looks like this example:


The collect json object defines how the test will be executed and against which URL. The assert json object defines the
assertions the `lh:assert` step will run. The upload json object defines the Lighthouse Server instance the results will
be uploaded to

Full details for the configuration file can be found on
[lighthouse-ci GitHub page](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md)

_NB: We are using `"cpuSlowdownMultiplier": 1` as a consistent throttling option as it seems to be the most appropriate
throttling for us. By default, Google uses 4x slowdown as this brings high-end machines down to mid-tier mobile
performance. However, our build agents are not high-end machines, so 1x slowdown has given the best representation. See:
https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md#calibrating-the-cpu-slowdown_

### Perf Metrics and Expectations

- Largest Contentful Paint
- Cumulative Layout Shift
- Blocking Time
- Time To Interactive
- Lighthouse performance score
- ~Total Content Size~ - _Not available in lighthouse-ci_

The values used in the assert configurations are based upon the results from a
[Rigor check monitoring UAT0](https://monitoring.rigor.com/checks/real-browsers/182046). The allows us to compare
non-production environments against UAT0 statistics. TODO: We need to gather performance statistics for Prod so that we
can ensure Plat Mod prod matches it. TODO: All assertions are set to WARN as we are currently only able to test against
Origin endpoints from the pipeline. Origin endpoints are not performant as they use local ESI. Once testing against Load
Balanced endpoints, there should be set to Error.

Details around assertions can be found on the
[lighthouse-ci GitHub page for assertions](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#assert).
You can also see a list of the assertions that are possible within the configuration file within the
[Lighthouse config page](https://github.com/GoogleChrome/lighthouse/blob/v6.0.0/lighthouse-core/config/default-config.js#L427)

## Pipeline

These tests are running in the Azure Pipeline after `deploy` stage each region. In order to run the tests (all three of
the LHCI scripts) you need to add the following to the deploy stage in your yaml pipeline:

```
  - stage: sx_testing
    displayName: 'Sandbox Testing'
    dependsOn:
      - deploy_sandbox_eun
      - deploy_sandbox_euw
    condition:
      and(succeeded('deploy_sandbox_eun'), succeeded('deploy_sandbox_euw'))
    variables:
      - group: 'Sandbox.eCommerce.plp.Frontend.EUN'
      - name: lh_test_target_domain #This variable must be set and available in the stage context so that the token replace step (Lighthouse) works correctly
        value: $(test_url)
    jobs:
      - job: Run_Lighthouse
        steps:
        - template: azDevOps\azure\templates\steps\deploy-lighthouse-tests.yml@MonorepoEcommerce
          parameters:
            lh_test_folder_path: "/lighthouse"
            lh_config_file_relative_path: './config/non-production_config.json'
            lh_server_upload: 'false'
            lh_artefact_name: 'sx_attempt-$(System.StageAttempt)'
```

- `lighthouse_test` _OPTIONAL_ -- Boolean flag to enable/disable running any Lighthouse testing. Defaults to `false`

- `lh_test_folder_path` _REQUIRED_ -- This is used as the working directory for the lighthouse step templates. I.e.
  `workingDir: '$(Build.SourcesDirectory)${{parameters.lh_test_folder_path}}'`

- `lh_config_file_relative_path` - _REQUIRED_ -- This is the path to the config file that the Lighthouse tasks will use.
  It is used the the following command: `npm run lh:collect -- --config=${{parameters.lh_config_file_relative_path}}`

- `lh_test_target_domain` - _REQUIRED_ -- This is the value that is used to replace tokens in the config files (I.e.
  `#{lh_test_target_domain}#` in `non-production_config.json`)

- `lh_server_upload` - _OPTIONAL_ -- Enables uploading to Lighthouse Server (LH SERVER NOT FULLY IMPLEMENTED YET)

- `lh_artefact_name` - _REQUIRED_ -- Suffix added to the folder name of the artifact. Useful if running Lighthouse
  multiple times in one deployment job

### Templates

The pipeline templates execute the following if `lighthouse_tests` is `true`:

- Execute `npm install` to install LHCI
- Replace tokens in the configuration files
- Execute `npm run lh:collect -- --config=${{parameters.lh_config_file_relative_path}}`
- Execute `npm run lh:assert -- --config=${{parameters.lh_config_file_relative_path}}`
- Execute `npm run lh:upload -- --config=${{parameters.lh_config_file_relative_path}}` (if `upload_to_lighthouse_server`
  is `true`)
- Publish the results (from `./lighthouse/.lighthouseci`) as an artifact on the pipeline
