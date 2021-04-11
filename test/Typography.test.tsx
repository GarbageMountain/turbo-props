import {
  baseTypography,
  testStyled as styled,
  testTheme as theme,
} from './index.test';
import { renderWithTheme } from './renderWithTheme';
import React from 'react';
import '@testing-library/jest-dom';

describe('Typography component', () => {
  const Typography = styled.h1`
    ${baseTypography}
  `;

  it('should have sensible defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Typography data-testid="typography">Turbo Props</Typography>,
    });

    const component = getByTestId(/typography/i);

    expect(component).toHaveStyle({
      color: 'red',
      // TODO -- this is a bug. Needs to be fixed
      font: 'monospace 18px 500 18px',
    });
  });

  it('should have sensible defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Typography data-testid="typography">Turbo Props</Typography>,
    });

    const component = getByTestId(/typography/i);

    expect(component).toHaveStyle({
      color: 'red',
      // TODO -- this is a bug. Needs to be fixed
      font: 'monospace 18px 500 18px',
    });
  });

  it('should respond to props', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: (
        <Typography data-testid="typography" textAlign weight="light">
          Turbo Props
        </Typography>
      ),
    });

    const component = getByTestId(/typography/i);

    expect(component).toHaveStyle({
      color: 'red',
      textAlign: 'center',
      // TODO -- this is a bug. Needs to be fixed
      font: 'monospace 18px 300 18px',
    });
  });
});
