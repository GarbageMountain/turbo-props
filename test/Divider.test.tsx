import {
  divider,
  testStyled as styled,
  testTheme as theme,
} from './index.test';
import { renderWithTheme } from './renderWithTheme';
import React from 'react';
import '@testing-library/jest-dom';

describe('Divider Component', () => {
  const DividerHorizontal = styled.div`
    ${divider.horizontal}
  `;

  const DividerVertical = styled.div`
    ${divider.vertical}
  `;

  it('should have sensible horizontal defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <DividerHorizontal data-testid="divider-horizontal" />,
    });

    const component = getByTestId(/divider-horizontal/i);

    expect(component).toHaveStyle({
      borderBottomWidth: '1px',
      borderColor: 'red',
    });
  });

  it('should have sensible vertical defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <DividerVertical data-testid="divider-vertical" />,
    });

    const component = getByTestId(/divider-vertical/i);

    expect(component).toHaveStyle({
      borderRightWidth: '1px',
      borderColor: 'red',
    });
  });
});
