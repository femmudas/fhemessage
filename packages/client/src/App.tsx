import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from './context/WalletContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import InboxPage from './pages/InboxPage';
import OutboxPage from './pages/OutboxPage';
import SpamPage from './pages/SpamPage';
import ComposePage from './pages/ComposePage';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <Routes>
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="/inbox" element={
            <Layout>
              <InboxPage />
            </Layout>
          } />
          <Route path="/outbox" element={
            <Layout>
              <OutboxPage />
            </Layout>
          } />
          <Route path="/spam" element={
            <Layout>
              <SpamPage />
            </Layout>
          } />
          <Route path="/compose" element={
            <Layout>
              <ComposePage />
            </Layout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
          }}
        />
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;