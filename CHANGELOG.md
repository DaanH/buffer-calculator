# Changelog

All notable changes to webAppStarterProject will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 15-2-2024

-   Removed TypeScript and linting requirements.

## [0.1.3] - 2023-09-14

-   Removed check-package-json script in favor of reset-package-json

#### notable changes

    -   reset-package-json runs in the pipeline and resets the package.json scripts before the build steps
    -   This is to ensure we can run our custom build scripts

## [0.1.2] - 2023-08-31

-   Edits to the check-package-json script

## [0.1.2] - 2023-08-01

-   Changed import of css and external data

## [0.1.1] - 2023-07-07

-   Added check-package-json script

## [0.1.0] - 2023-04-28

### Added

-   Updated rules for Typescript and ESlint

#### notable changes

    - Prefer default export on a file with single export
    - No implicit any

## [0.0.0] - 2022-11-8

-   First set up of ProjecSt
