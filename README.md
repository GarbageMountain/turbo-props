# ─=≡Σ༼ つ ▀ \_▀ ༽つ`turbo-props`

## A Post-it® sized wrapper around `styled-components` to turbo charage your workflow.

- Automatically bake in your theme and design tokens into Typescript. Autocomplete your props based off your theme. Export your theme `Types` where ever you need them.
- Sensiable defaults.
- First class visual debugging
- An API that can fit on a Post-It note.
- Small set of primative components to build on top of.
- The full power and flexability of `styled-components` under the hood.
- Strong opinions around margin. We agree with creator of styled-components [margin is harmful](https://mxstbr.com/thoughts/margin/) and didn't include it in the API.

<image src="https://user-images.githubusercontent.com/2502947/114310769-ee259600-9ab9-11eb-8fff-d878a3327b24.gif" height="400px" >

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

---

## The API

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

## Primative Components

```tsx
<Layout.Column></Layout.Column>
<Layout.Row></Layout.Row>
<Spacer.Flex />
<Spacer.Horizontal />
<Spacer.Vertical />
<Divider.Horizontal />
<Divider.Vertical />
<Text>Hello</Text>
```

---

## Composable API

Just like with `styled-components`, composing your own abstractions on top of `turbo-props` is easy.

example: A `Circle` component

```tsx
import { styled, css } from '../theme';
import { Layout } from './Layout.component';

export type CircleProps = { circleSize: number };

export const baseCircleStyle = css<CircleProps>`
  border-radius: ${({ circleSize }) => circleSize / 2}px;
  width: ${({ circleSize }) => circleSize}px;
  height: ${({ circleSize }) => circleSize}px;
  overflow: hidden;
`;

export const Circle = styled(Layout.Column)<CircleProps>`
  ${baseCircleStyle}
`;
```

## First Class Debugging

We got sick of writing `border: 1px solid red` so we wrote it into our components.

```tsx
 Row: styled(View)`
    ${baseLayout}
    ${baseRowLayout}
    ${({ debug, theme: { debugBorders } }) =>
      (debugBorders || debug) &&
      `border: solid ${StyleSheet.hairlineWidth}px red;`}
  `,
```

Or you can import our `debug` function.

```tsx
 Row: styled(View)`
    ${baseLayout}
    ${baseRowLayout}
    ${debug('red')}
  `,
```

With a global state libary, you can toggle visual debugging with one click. Refer to our [example project]('https://github.com/GarbageMountain/turbo-talk-native-example-rainbow-wallet) for a `zustand` implementation.

<img src="https://user-images.githubusercontent.com/2502947/132853348-a04ed6c9-6ab7-47f3-84f5-12c16b726e72.gif" height=400 >

## Starter Template

If you want to skip the set up for and hop right in `react-native` projects we have a starter template [here](https://github.com/GarbageMountain/turbo-starter)

---

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
