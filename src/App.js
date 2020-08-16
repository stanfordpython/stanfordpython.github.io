import React, { Component } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';
import { Page } from './Page';
import { LectureVideo } from './LectureVideo';
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
              <Route exact path="/lectures" component={About} />
              <Route exact path="/labs" component={About} />
              <Route exact path="/assignments" component={Contact} />
              <Route path="/page/:slug" component={Page}/>
              <Route path="/lecture/:slug" component={LectureVideo}/>
              <Route path="/:slug" component={NoMatch}/>
          </Switch>
          </Layout>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;