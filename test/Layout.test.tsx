import {
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  testStyled as styled,
  testTheme as theme,
} from './index.test';
import { renderWithTheme } from './renderWithTheme';
import React from 'react';
import '@testing-library/jest-dom';

describe('Layout Base Component', () => {
  const Base = styled.div`
    ${baseLayout}
  `;

  const Row = styled.div`
    ${baseLayout}
    ${baseRowLayout}
  `;

  const Column = styled.div`
    ${baseLayout}
    ${baseColumnLayout}
  `;

  it('should have sensible defaults', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Base data-testid="base" />,
    });

    const component = getByTestId(/base/i);
    expect(component).toHaveStyle({
      display: 'flex',
      padding: '0px 0px',
      backgroundColor: undefined,
      position: undefined,
      borderRadius: undefined,
    });
  });

  it('should handle have prop defaults', () => {
    // Todo: figure out shadow prop
    const { getByTestId } = renderWithTheme({
      theme,
      children: (
        <Base data-testid="base" grow px py bg="brand" center absolute shadow />
      ),
    });

    const component = getByTestId(/base/i);

    expect(component).toHaveStyle({
      padding: '18px 24px',
      backgroundColor: 'red',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('should position flex items', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: (
        <Base data-testid="base" align="flex-end" justify="space-between" />
      ),
    });

    const component = getByTestId(/base/i);

    expect(component).toHaveStyle({
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    });
  });

  it('should be a row', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Row reverse data-testid="row" size={30} />,
    });

    const component = getByTestId(/row/i);

    expect(component).toHaveStyle({
      flexDirection: 'row-reverse',
      display: 'flex',
      // TODO: This is specific to rn
      // need to fix
      height: '30px',
    });
  });

  it('should debug borders on Row', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Row debug data-testid="row" size={30} />,
    });

    const component = getByTestId(/row/i);
    expect(component).toHaveStyle({
      border: '1px solid green',
    });
  });

  it('should be a column', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Column data-testid="column" reverse size={30} />,
    });

    const component = getByTestId(/column/i);

    expect(component).toHaveStyle({
      flexDirection: 'column-reverse',
      display: 'flex',
      width: '30px',
    });
  });

  it('should debug borders on Column', () => {
    const { getByTestId } = renderWithTheme({
      theme,
      children: <Column data-testid="column" debug />,
    });

    const component = getByTestId(/column/i);

    expect(component).toHaveStyle({
      border: '1px solid pink',
    });
  });
});
