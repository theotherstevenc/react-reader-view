/**
 * Popup Entry Point
 *
 * Renders the React popup UI
 * Cross-browser compatible (Chrome, Firefox, Edge)
 */

import { createRoot } from 'react-dom/client'

import { Popup } from './Popup'
import './popup.css'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<Popup />)
}
