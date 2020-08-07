import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../src/react-md-component.jsx';

(function() {
  let md = '# hello world';

  ReactDOM.render(
    <div>
      <Component markdown={md} />
      <Component fileName="README.md" />
      <Component fileName="README.md" nested />
    </div>,
    document.getElementById('app')
  );
})();
