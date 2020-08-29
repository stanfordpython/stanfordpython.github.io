import React, { Component } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Home } from './Home';
import { Lectures } from './Lectures';
import { Labs } from './Labs.js';
import { Assignments } from './Assignments.js';
import { NoMatch } from './NoMatch';
import { Page } from './Page';
import { LecturePage } from './LectureVideo';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <NavigationBar />
          <Layout>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lectures" component={Lectures} />
              <Route exact path="/labs" component={Labs} />
              <Route exact path="/assignments" component={Assignments} />

              <Route path="/page/:slug+" component={Page}/>
              <Route path="/lecture/:slug" component={LecturePage}/>
              
              <Route component={NoMatch}/>
          </Switch>
          </Layout>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;