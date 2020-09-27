import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MakePDF } from '../example/MakePDF';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MakePDF />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
