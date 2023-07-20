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
import Games from "pages/Games";
import GameDetail from "pages/GameDetail";
import Explore from "pages/Explore";
import Collector from "pages/Collector";
import Bridge from "pages/Bridge";
import NFTDetail  from "pages/NFTDetail";
import Dashboard from "pages/Dashboard";
import CollectionManageIndex from "pages/Dashboard/CollectionManage";
import CollectionDetail from "pages/CollectionInfo"

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const routeArr = [
  {
    component: Home, path: '/', parent: 'home'
  },
  // {
  //   component: Games, path: '/games', special: 'game'
  // },
  // {
  //   component: GameDetail, path: '/games/:id', special: 'game'
  // },
  {
    component: Explore, path: '/explore', parent: 'explore'
  },
  {
    component: Bridge, path: '/bridge', parent: 'bridge'
  },
  {
    component: Collector, path: '/collector'
  },
  {
    component: Dashboard, path: '/dashboard', parent: 'dashboard'
  },
  {
    component: CollectionManageIndex, path: '/collectionManage/:collectionId', parent: 'dashboard'
  },
  {
    component: CollectionDetail, path: '/collectionDetail/:collectionId'
  },
  {
    component: NFTDetail, path: '/NFTDetail/:chainType/:contractAddress/:tokenId'
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
