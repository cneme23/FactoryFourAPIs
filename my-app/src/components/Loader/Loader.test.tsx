import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import Loader from './Loader';

describe('<Loader />', () => {
  test('should render', () => {
    render(<Loader />);

    const loader = screen.getByTestId('Loader');

    expect(loader).toBeInTheDocument();
  });
});