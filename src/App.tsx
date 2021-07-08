import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { About } from './pages/About'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
    </Switch>
  </BrowserRouter>
)

export default App
