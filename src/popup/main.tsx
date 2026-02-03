/**
 * Popup Entry Point
 *
 * Renders the React popup UI
 */

import { createRoot } from 'react-dom/client'

import { initChromeMock } from './chromeMock'
import { Popup } from './Popup'
import './popup.css'

// Enable mocks for browser testing
initChromeMock()

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<Popup />)
}
