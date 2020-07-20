import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <NavigationBar />
          <Layout>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
          </Layout>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;