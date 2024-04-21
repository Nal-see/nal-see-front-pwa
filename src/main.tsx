import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser.ts');
//   return worker.start();
// }

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
// enableMocking().then(() => {
//   root.render(<App />);
// });
