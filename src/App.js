import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import './i18n'
import "./assets/css/style.scss";
import "tailwindcss/tailwind.css"
import { ContextProvider } from "./reducer";
import Layout from "./components/Layout";
import Home from "pages/Home";
import Explore from "pages/Explore";
import Collector from "pages/Collector";
import Bridge from "pages/Bridge";


function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const routeArr = [
  {
    component: Home, path: '/', parent: 'home'
  },
  {
    component: Explore, path: '/explore', parent: 'explore'
  },
  {
    component: Bridge, path: '/bridge', parent: 'bridge'
  },
  {
    component: Collector, path: '/collector'
  },
]

function App() {
  return (
    <ContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Layout routeArr={routeArr}>
            <CacheSwitch>
              <Route exact path="/discover">
                <Redirect to="/" />
              </Route>
              {
                routeArr.map(item => {
                  if (item.cache) {
                    return <CacheRoute cacheKey={item.path} key={item.path} exact {...item} />
                  }
                  return <Route key={item.path} exact {...item} />
                })
              }
            </CacheSwitch>
          </Layout>
        </Router>
      </Web3ReactProvider>
    </ContextProvider>
  );
}

export default App;
