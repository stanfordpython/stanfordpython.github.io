import React, { FunctionComponent } from "react";
import { Routes, HashRouter, Route } from "react-router-dom";

import "./App.css";

import Page from "../Page";
import Layout from "../Layout";
import NavigationBar from "../NavigationBar";

import Home from "../Page/Home";
import Lectures from "../Page/Lectures";
import Labs from "../Page/Labs";
import Assignments from "../Page/Assignments";
import NoMatch from "../Page/NoMatch";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <NavigationBar />
        <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lectures" element={<Lectures />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/page/:slug+" element={<Page />}/>
              <Route element={<NoMatch />}/>
          </Routes>
        </Layout>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;