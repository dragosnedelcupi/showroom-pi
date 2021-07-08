import React from 'react'
import { NavLink } from 'react-router-dom'
import { logo } from '../assets/images/images'
import DynamicFormattedMessage from './common/ui/DynamicFormattedMessage'

export const Navbar: React.FC = () => (
  <header className="px-3 py-5 shadow-lg bg-white">
    <div>
      <nav className="flex items-center">
        <NavLink to="/" className="block">
          <img src={logo} className="block" alt="Logo" />
        </NavLink>
        <ul className="flex items-center ml-auto text-secondary">
          <li className="ml-5">
            <DynamicFormattedMessage
              id="home"
              tag={NavLink}
              exact={true}
              activeClassName="text-primary"
              className="text-lg font-medium hover:text-primary transition-colors"
              to="/"
            />
          </li>
          <li className="ml-5">
            <DynamicFormattedMessage
              id="about"
              tag={NavLink}
              exact={true}
              activeClassName="text-primary"
              className="text-lg font-medium hover:text-primary transition-colors"
              to="/about"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
)
