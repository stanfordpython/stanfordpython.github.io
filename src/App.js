import React, { Component } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
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
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/:slug" component={NoMatch}/>
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;