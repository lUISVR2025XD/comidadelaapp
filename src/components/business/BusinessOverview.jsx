import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { DollarSign, ShoppingBag, Clock, TrendingUp } from 'lucide-react';

const BusinessOverview = () => {
  const { user } = useAuth();
  const { orders, businesses } = useData();

  const business = businesses.find(b => b.id === user?.businessId) || businesses[0];
  const businessOrders = orders.filter(order => order.businessId === business?.id);
  
  const todayOrders = businessOrders.filter(order => {
    const today = new Date().toDateString();
    return new Date(order.createdAt).toDateString() === today;
  });

  const totalRevenue = businessOrders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = businessOrders.filter(order => order.status === 'pending').length;
  const activeOrders = businessOrders.filter(order => 
    ['accepted', 'preparing', 'ready', 'delivering'].includes(order.status)
  ).length;

  const stats = [
    {
      title: 'Ingresos Totales',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      change: '+12.5%'
    },
    {
      title: 'Pedidos Hoy',
      value: todayOrders.length,
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-600',
      change: '+8.2%'
    },
    {
      title: 'Pedidos Pendientes',
      value: pendingOrders,
      icon: Clock,
      color: 'from-orange-500 to-amber-600',
      change: pendingOrders > 0 ? 'Requiere atención' : 'Todo al día'
    },
    {
      title: 'Pedidos Activos',
      value: activeOrders,
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      change: `${activeOrders} en proceso`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Panel de Control - {business?.name}
        </h1>
        <p className="text-white/70 text-lg">
          Gestiona tu restaurante y supervisa tus pedidos
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="glass-card border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <p className="text-white/60 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-white">Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {businessOrders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📦</div>
                <p className="text-white/70">No hay pedidos aún</p>
              </div>
            ) : (
              <div className="space-y-4">
                {businessOrders.slice(0, 5).map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">Pedido #{order.id}</p>
                      <p className="text-white/70 text-sm">{order.clientName}</p>
                      <p className="text-white/60 text-xs">
                        {new Date(order.createdAt).toLocaleString('es-ES')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-500 text-white' :
                        order.status === 'accepted' ? 'bg-blue-500 text-white' :
                        order.status === 'preparing' ? 'bg-orange-500 text-white' :
                        order.status === 'ready' ? 'bg-purple-500 text-white' :
                        order.status === 'delivering' ? 'bg-indigo-500 text-white' :
                        order.status === 'delivered' ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {order.status === 'pending' ? 'Pendiente' :
                         order.status === 'accepted' ? 'Aceptado' :
                         order.status === 'preparing' ? 'Preparando' :
                         order.status === 'ready' ? 'Listo' :
                         order.status === 'delivering' ? 'En camino' :
                         order.status === 'delivered' ? 'Entregado' :
                         'Cancelado'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-white">Estado del Negocio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  business?.isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <p className="text-white font-medium">
                  {business?.isOpen ? 'Abierto' : 'Cerrado'}
                </p>
                <p className="text-white/70 text-sm">Estado actual</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">⭐ {business?.rating}</p>
                <p className="text-white/70 text-sm">Calificación</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{business?.deliveryTime}</p>
                <p className="text-white/70 text-sm">Tiempo de entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BusinessOverview;