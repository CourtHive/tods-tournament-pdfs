import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MakePDF } from './MakePDF';

const App = () => {
  return (
    <>
      <div>TODS Tournament PDFs</div>
      <MakePDF />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
