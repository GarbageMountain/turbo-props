import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { Theme } from './index.test';

export const renderWithTheme = ({
  theme,
  children,
}: {
  theme: Theme;
  // Need to fix this. Not sure how to tho
  children: any;
}) => render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
