import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Toaster }      from 'react-hot-toast';

export const metadata = {
  title:       'NexusIQ | AI Business Intelligence',
  description: 'AI-powered business intelligence platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background:   '#1e1b4b',
                color:        '#fff',
                borderRadius: '10px',
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}