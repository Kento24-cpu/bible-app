# bible-app
Modern and simple app of Bible 

## Releases

Releases are automated with GitHub Actions and EAS. The repository needs an `EXPO_TOKEN` secret (Expo dashboard → Account settings → Access tokens).

- Push to `main`: publishes an OTA bundle to the `preview` channel with `eas update`. Installed production builds do not receive it; only preview builds do.
- Push a tag matching `app.json` (for example `v1.0.1`): runs tests and typecheck, builds a production APK with EAS, publishes that same commit to the `production` channel, and creates a GitHub Release with the APK attached.
- Manual workflow run: builds the production APK and leaves it as a workflow artifact, without creating a release.
- Rollback of a bad OTA on `production`: `npx eas-cli update:rollback --branch production --runtime-version <app.json version>`, or republish the previous commit with `eas update --channel production`.

`npm run release [patch|minor|major]` still bumps the version locally and can trigger a build from your machine.
