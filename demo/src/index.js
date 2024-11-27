import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './ErrorBoundary';
// Importation des modules pour la mise en évidence du code
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Sélectionnez le conteneur DOM
const container = document.getElementById('demo');

// Vérifiez si le conteneur DOM existe
if (!container) {
  throw new Error("Target container 'demo' is not a DOM element.");
}

// Créez la racine et rendez l'application
const root = createRoot(container);
root.render(<ErrorBoundary><App /></ErrorBoundary>);

registerServiceWorker();
