# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

- Never run the `reset-project` script unless the user explicitly asks: it moves `app/` to `app-example/` (and `scripts/reset-project.js` isn't in the repo yet).
- Use the `cn()` helper from `lib/cn.ts` (clsx + tailwind-merge) when composing conditional/overridable className strings.
- The codebase uses Portuguese naming (`Botao` = "button", `postagem` = "post") — follow the existing language within a component/file rather than mixing.
- `babel.config.js` (`jsxImportSource: 'nativewind'`, `nativewind/babel`, `react-native-worklets/plugin`) and `metro.config.js` (`withNativeWind` → `global.css`) are required for styling — don't remove them when editing build config.
