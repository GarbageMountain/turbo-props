# ─=≡Σ༼ つ ▀ \_▀ ༽つ`turbo-props`

### Styled Components props for making snazzy building blocks using Typescript.

---

## Installation

```bash
yarn add turbo-props styled-components # or npm install turbo-props styled-components

yarn add -D @types/styled-components # or npm install --save-dev @types/styled-components
```

## Basic Usage

```typescript
// in your Theme.ts file
import { TurboProps, ThemedProps } from 'turbo-props';

export const {
  /*
   * your theme ie. the first argument to the TurboProps function,
   * which is passed to the styled-components ThemeProvider
   */
  theme,
  css, // a css function with your theme baked in
  styled, // a styled function with your theme baked in
  useTheme, // a useTheme hook with your theme baked in
  // `turbo-props` basic building blocks
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  baseTypography,
  spacer,
  divider,
} = TurboProps(
  // this is your main app theme, it is returned from the TurboProps function (see `theme` above)
  {
    // be descriptive when describing your color names
    colors: { brand: 'red' },
    /*
     * sizes can be described in any way, we've found it useful to use
     * a hybrid of t-shirt sizing / numeric value to provide both context
     * and detail
     */
    sizes: {
      's-10': 12,
      'm-18': 18,
      'l-24': 24,
    },
    fonts: {
      mono: {
        light: 'monospace 300',
        regular: 'monospace 500',
        bold: 'monospace 700',
      },
      'sans-serif': {
        light: 'sans-serif 300',
        regular: 'sans-serif 500',
        bold: 'sans-serif 700',
      },
    },
    grid: 8,
  },
  // these are your theme defaults, the values that are used as fallbacks if no value is entered
  {
    color: 'brand',
    font: 'mono',
    weight: 'regular',
    sizes: {
      font: 'm-18',
      px: 'l-24',
      py: 'm-18',
      radius: 's-10',
    },
  }
);

/**
 * export the types of your theme to be used when making
 * your UI building blocks
 */
type Theme = typeof theme;
type TP = ThemedProps<Theme>;
export type LayoutProps = TP['LayoutProps'];
export type TypographyProps = TP['TypographyProps'];
export type SpacerProps = TP['SpacerProps'];
export type DividerProps = TP['DividerProps'];
export type Color = TP['Colors'];
export type Size = TP['Sizes'];
export type Font = TP['Fonts'];
export type Weight = TP['Weights'];
export type DebugProps = TP['DebugProps'];
```

# Dev

This package uses `tsdx`, so some of the instructions for development are left below.

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
yarn start # or npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
