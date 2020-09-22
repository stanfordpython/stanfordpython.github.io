import React, { FunctionComponent } from "react";
import { Switch, HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lectures from "./pages/Lectures";
import Labs from "./pages/Labs";
import Assignments from "./pages/Assignments";
import NoMatch from "./pages/NoMatch";
import { Page } from "./components/Page";
import { LecturePage } from "./components/LectureVideo";
import { Layout } from "./Layout";
import { NavigationBar } from "./NavigationBar";
import "./App.css";

const App: FunctionComponent = () => {
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

export default App;