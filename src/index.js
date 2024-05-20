import React from 'react';
import { createRoot } from 'react-dom/client';
import TodoApp from './components/TodoApp';

const root = createRoot(document.getElementById('root'));
root.render(<TodoApp />);
