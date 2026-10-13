# VOID Launcher 0.1.0 (Starter)

This is a working Tauri/React desktop UI starter, NOT yet a working Minecraft launcher.

## Requirements (Windows)
- Node.js LTS (includes npm)
- Rust (rustup)
- Microsoft C++ Build Tools with Desktop development with C++
- WebView2 Runtime (typically installed on Windows 10/11)

## Start
```powershell
npm install
npm run tauri dev
```

## Installer (UI-only alpha)
```powershell
npm run tauri build
```
The NSIS setup executable is created under `src-tauri/target/release/bundle/nsis/`.

## Included files
- `public/mods/void-client-2.1.0.jar`: uploaded mod, packaged for later installation integration.
- `public/assets/void-icon.png`: UI branding image.

## Planned integrations
1. Official Microsoft OAuth and Minecraft entitlement check.
2. Minecraft version manifest download, Java runtime, Fabric Loader and Fabric API install.
3. Managed per-profile game directories, mod deployment and launch process.
4. GitHub release manifest, hash/signature verification, updater, notification, rollback.
5. Code signing and public installer distribution.

**Important:** No game download, login, update install or Minecraft launch is implemented in this starter. The update tab can query the latest GitHub Release after setting `githubRepo` in `src/App.tsx`.
