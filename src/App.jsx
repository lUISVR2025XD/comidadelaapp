import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import HomePage from '@/pages/HomePage';
import ClientDashboard from '@/pages/ClientDashboard';
import BusinessDashboard from '@/pages/BusinessDashboard';
import DeliveryDashboard from '@/pages/DeliveryDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import OrderTracking from '@/pages/OrderTracking';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen">
            <Helmet>
              <title>DeliveryApp - Plataforma de Entregas a Domicilio</title>
              <meta name="description" content="Conecta clientes, negocios y repartidores en una plataforma integrada de entregas a domicilio" />
              <meta property="og:title" content="DeliveryApp - Plataforma de Entregas a Domicilio" />
              <meta property="og:description" content="Conecta clientes, negocios y repartidores en una plataforma integrada de entregas a domicilio" />
            </Helmet>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cliente/*" element={<ClientDashboard />} />
              <Route path="/negocio/*" element={<BusinessDashboard />} />
              <Route path="/repartidor/*" element={<DeliveryDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/seguimiento/:orderId" element={<OrderTracking />} />
            </Routes>
            
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;