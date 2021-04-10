import { spacer, testStyled as styled, testTheme as theme } from './index.test';
import { renderWithTheme } from './renderWithTheme';
import React from 'react';
import '@testing-library/jest-dom';

describe('Spacer Component', () => {
  const SpacerVertical = styled.div`
    ${spacer.vertical}
  `;

  const SpacerHorizontal = styled.div`
    ${spacer.horizontal}
  `;

  const SpacerFlex = styled.div`
    ${spacer.flex}
  `;

  it('should have sensible horizontal defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerHorizontal data-testid="spacer-horizontal" units={1} />,
    });

    const component = getByTestId(/spacer-horizontal/i);

    expect(component).toHaveStyle({
      width: '8px',
    });
  });

  it('should use horizontal sizes', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: (
        <SpacerHorizontal data-testid="spacer-horizontal" size="m-18" />
      ),
    });

    const component = getByTestId(/spacer-horizontal/i);

    expect(component).toHaveStyle({
      width: '18px',
    });
  });

  it('should debug horizontal spacer', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerHorizontal data-testid="spacer-horizontal" debug />,
    });

    const component = getByTestId(/spacer-horizontal/i);

    expect(component).toHaveStyle({
      border: '1px solid red',
    });
  });

  it('should have sensible vertical defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerVertical data-testid="spacer-vertical" units={1} />,
    });

    const component = getByTestId(/spacer-vertical/i);

    expect(component).toHaveStyle({
      height: '8px',
    });
  });

  it('should use vertical sizes', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerVertical data-testid="spacer-vertical" size="m-18" />,
    });

    const component = getByTestId(/spacer-vertical/i);

    expect(component).toHaveStyle({
      height: '18px',
    });
  });

  it('should have sensible flex defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerFlex data-testid="spacer-flex" />,
    });

    const component = getByTestId(/spacer-flex/i);

    expect(component).toHaveStyle({
      flex: '1',
    });
  });

  it('should have flex grow', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerFlex data-testid="spacer-flex" grow={2} />,
    });

    const component = getByTestId(/spacer-flex/i);

    expect(component).toHaveStyle({
      flexGrow: 2,
    });
  });

  it('should have flex shrink', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <SpacerFlex data-testid="spacer-flex" shrink={2} />,
    });

    const component = getByTestId(/spacer-flex/i);

    expect(component).toHaveStyle({
      flexShrink: 2,
    });
  });
});
