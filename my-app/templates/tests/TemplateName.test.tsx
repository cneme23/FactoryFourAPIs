import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'helpers/tests.helper';
import TemplateName from './TemplateName';

describe('<TemplateName />', () => {
  test('should render', () => {
    render(<TemplateName />);

    const templateName = screen.getByTestId('TemplateName');

    expect(templateName).toBeInTheDocument();
  });
});