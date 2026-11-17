# bible-app
Modern and simple app of Bible 

## Releases

Releases are automated with GitHub Actions and EAS. The repository needs an `EXPO_TOKEN` secret (Expo dashboard → Account settings → Access tokens).

- Push to `main`: publishes an OTA bundle to the `preview` channel with `eas update`. Installed preview builds pick it up through the in-app update check.
- Push a tag matching `app.json` (for example `v1.0.1`): runs tests and typecheck, builds a production APK with EAS, and creates a GitHub Release with the APK attached.
- Manual workflow run: builds the production APK and leaves it as a workflow artifact, without creating a release.

`npm run release [patch|minor|major]` still bumps the version locally and can trigger a build from your machine.
