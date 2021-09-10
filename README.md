# ─=≡Σ༼ つ ▀ \_▀ ༽つ`turbo-props`

## A Small wrapper around `styled-components` to turbo charage your workflow.

- Automatically bake in your theme and design tokens into Typescript. Autocomplete your props based off your theme.
- Sensiable defaults.
- An API that can fit on a Post-It note.
- Small set of primative components to build on top of.
- The full power and flexability of `styled-components` under the hood.

<image src="https://user-images.githubusercontent.com/2502947/114310769-ee259600-9ab9-11eb-8fff-d878a3327b24.gif" height="400px" >

```tsx
<Layout.Column
  debug
  grow
  radius="s-10"
  border={[1, 'solid', 'grey']}
  shadow
  justify
>
  <Layout.Row px py absolute bg="white" align>
    <Text weight="light" size="s-10">
      Hello Turbo ─=≡Σ༼ つ ▀ \_▀ ༽つ
    </Text>
  </Layout.Row>
</Layout.Column>
```

---

## Installation

### yarn

```bash
yarn add turbo-props styled-components
yarn add -D @types/styled-components
```

### npm

```bash
npm install turbo-props styled-components
npm install --save-dev @types/styled-components
```

## Basic Usage

`layout.tsx`

```typescript

const {baseLayout, baseRowLayout, LayoutProps, baseColumnLayout, spacer, base styled} from './yourConfig.ts'

const Row = styled.div<LayoutProps>`
  ${baseLayout}
  ${baseRowLayout}
`

const Column = styled.div<LayoutProps>`
  ${baseLayout}
  ${baseColumnLayout}
`

const SpacerHorizontal = styled.div`
  ${spacer}
`

const Text = styled.p`
  ${baseTypography}
`
  <Column px>
    <Spacer size="l-24" />
    <Row size="m-18" reverse>
      <Text weight="light">Turbo Props ─=≡Σ༼ つ ▀ \_▀ ༽つ</Text>
    </Row>
  </Column>
```

## Basic Configuration

`yourConfig.ts`

```typescript
import { TurboProps, ThemedProps, baseTypography } from 'turbo-props';

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
  // example: <Row px="l-24" /> v. <Row px />
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

### Contributing

- Please create an issue with reproducible steps or feature requests.
- Build steps and configuration [here](https://github.com/GarbageMountain/turbo-props/wiki/Contributing)
