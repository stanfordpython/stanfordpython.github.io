import React, { Component } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';
import { Page } from './Page'
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <NavigationBar />
          <Layout>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route path="/page/:slug" component={Page}/>
              <Route exact path="/:slug" component={NoMatch}/>
          </Switch>
          </Layout>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;