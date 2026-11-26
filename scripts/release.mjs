#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const USAGE =
  'usage: npm run release [patch|minor|major] [--platform=android|ios|all] [--no-build] [--dry-run]'

const [type = 'patch', ...flags] = process.argv.slice(2)
// npm eats flags passed without `--` and re-exposes them as npm_config_* env vars.
const envFlag = (name) => process.env[`npm_config_${name}`] !== undefined
const dryRun = flags.includes('--dry-run') || envFlag('dry_run')
const noBuild = flags.includes('--no-build') || envFlag('build')
const platform =
  flags.find((flag) => flag.startsWith('--platform='))?.split('=')[1] ??
  process.env.npm_config_platform ??
  'android'

if (!['patch', 'minor', 'major'].includes(type)) {
  console.error(USAGE)
  process.exit(1)
}
if (!['android', 'ios', 'all'].includes(platform)) {
  console.error(USAGE)
  process.exit(1)
}

const bump = (version, type) => {
  const [major, minor, patch] = version.split('.').map(Number)
  if (type === 'major') return `${major + 1}.0.0`
  if (type === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

const appPath = 'app.json'
const app = JSON.parse(readFileSync(appPath, 'utf8'))
const next = bump(app.expo.version, type)
console.log(`version ${app.expo.version} -> ${next}`)

if (dryRun) process.exit(0)

const run = (command, args) => execFileSync(command, args, { stdio: 'inherit' })

run('npm', ['test'])
run('npx', ['tsc', '--noEmit'])
run('npm', ['version', next, '--no-git-tag-version'])

app.expo.version = next
writeFileSync(appPath, `${JSON.stringify(app, null, 2)}\n`)

if (noBuild) process.exit(0)

run('npx', ['--yes', 'eas-cli@27', 'build', '--platform', platform, '--profile', 'production'])
