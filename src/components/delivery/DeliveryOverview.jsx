import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, Truck, Clock, TrendingUp, Power, PowerOff } from 'lucide-react';

const DeliveryOverview = () => {
  const { user } = useAuth();
  const { orders, deliveryPersons, updateDeliveryPerson } = useData();
  const { toast } = useToast();

  const deliveryPerson = deliveryPersons.find(d => d.id === user?.deliveryId) || deliveryPersons[0];
  
  const myDeliveries = orders.filter(order => order.deliveryPersonId === deliveryPerson?.id);
  const todayDeliveries = myDeliveries.filter(order => {
    const today = new Date().toDateString();
    return new Date(order.createdAt).toDateString() === today;
  });

  const completedDeliveries = myDeliveries.filter(order => order.status === 'delivered');
  const activeDeliveries = myDeliveries.filter(order => order.status === 'delivering');
  const availableOrders = orders.filter(order => order.status === 'ready' && !order.deliveryPersonId);

  const todayEarnings = todayDeliveries
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + (order.total * 0.15), 0); // 15% commission

  const stats = [
    {
      title: 'Ganancias Hoy',
      value: `$${todayEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      change: `${todayDeliveries.length} entregas`
    },
    {
      title: 'Entregas Activas',
      value: activeDeliveries.length,
      icon: Truck,
      color: 'from-blue-500 to-cyan-600',
      change: 'En proceso'
    },
    {
      title: 'Pedidos Disponibles',
      value: availableOrders.length,
      icon: Clock,
      color: 'from-orange-500 to-amber-600',
      change: 'Listos para recoger'
    },
    {
      title: 'Total Entregas',
      value: deliveryPerson?.totalDeliveries || 0,
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      change: 'Historial completo'
    }
  ];

  const toggleOnlineStatus = () => {
    const newStatus = !deliveryPerson?.isOnline;
    updateDeliveryPerson(deliveryPerson.id, { isOnline: newStatus });
    
    toast({
      title: newStatus ? "¡Ahora estás en línea!" : "Te has desconectado",
      description: newStatus 
        ? "Comenzarás a recibir notificaciones de nuevos pedidos" 
        : "No recibirás nuevos pedidos hasta que te conectes",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Panel de Repartidor
        </h1>
        <p className="text-white/70 text-lg">
          Gestiona tus entregas y maximiza tus ganancias
        </p>
      </motion.div>

      {/* Online Status Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {deliveryPerson?.isOnline ? (
                  <Power className="w-6 h-6 text-green-400" />
                ) : (
                  <PowerOff className="w-6 h-6 text-red-400" />
                )}
                <span className="text-white font-medium">
                  Estado: {deliveryPerson?.isOnline ? 'En línea' : 'Desconectado'}
                </span>
              </div>
              <Button
                onClick={toggleOnlineStatus}
                className={`${
                  deliveryPerson?.isOnline 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {deliveryPerson?.isOnline ? 'Desconectarse' : 'Conectarse'}
              </Button>
            </div>
          </CardContent>
        </Card>
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

      {/* Active Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-white">Entregas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            {activeDeliveries.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🚚</div>
                <p className="text-white/70">No tienes entregas activas</p>
                <p className="text-white/60 text-sm">
                  {deliveryPerson?.isOnline 
                    ? 'Busca nuevos pedidos para comenzar a ganar' 
                    : 'Conéctate para recibir pedidos'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeliveries.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">Pedido #{order.id}</p>
                      <p className="text-white/70 text-sm">{order.businessName}</p>
                      <p className="text-white/60 text-xs">
                        {order.deliveryAddress.street}, {order.deliveryAddress.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                      <p className="text-green-400 text-sm">
                        +${(order.total * 0.15).toFixed(2)} comisión
                      </p>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-indigo-500 text-white">
                        En camino
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Driver Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-white">Tu Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">⭐ {deliveryPerson?.rating}</p>
                <p className="text-white/70 text-sm">Calificación</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{deliveryPerson?.totalDeliveries || 0}</p>
                <p className="text-white/70 text-sm">Entregas totales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${(deliveryPerson?.earnings || 0).toFixed(2)}</p>
                <p className="text-white/70 text-sm">Ganancias totales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">🏍️ {deliveryPerson?.vehicle}</p>
                <p className="text-white/70 text-sm">Vehículo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      {deliveryPerson?.isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={() => window.location.href = '/repartidor/pedidos'}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90"
          >
            Buscar Pedidos ({availableOrders.length})
          </Button>
          {activeDeliveries.length > 0 && (
            <Button
              onClick={() => window.location.href = '/repartidor/entregas'}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"
            >
              Ver Entregas Activas
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DeliveryOverview;