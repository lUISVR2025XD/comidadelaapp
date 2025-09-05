import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, CheckCircle, Navigation } from 'lucide-react';

const ActiveDeliveries = () => {
  const { user } = useAuth();
  const { orders, updateOrder, deliveryPersons, updateDeliveryPerson } = useData();
  const { toast } = useToast();

  const deliveryPerson = deliveryPersons.find(d => d.id === user?.deliveryId) || deliveryPersons[0];
  const activeDeliveries = orders.filter(order => 
    order.deliveryPersonId === deliveryPerson?.id && 
    order.status === 'delivering'
  );

  const handleCompleteDelivery = (order) => {
    updateOrder(order.id, { status: 'delivered' });
    
    // Update delivery person stats
    const commission = order.total * 0.15;
    updateDeliveryPerson(deliveryPerson.id, {
      totalDeliveries: (deliveryPerson.totalDeliveries || 0) + 1,
      earnings: (deliveryPerson.earnings || 0) + commission
    });

    toast({
      title: "¡Entrega completada!",
      description: `Has ganado $${commission.toFixed(2)} por esta entrega`,
    });
  };

  const handleContactClient = (order) => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleNavigate = (address) => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
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
          Entregas Activas
        </h1>
        <p className="text-white/70 text-lg">
          Gestiona tus entregas en curso
        </p>
      </motion.div>

      {/* Active Deliveries */}
      <div className="space-y-6">
        {activeDeliveries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🚚</div>
            <h3 className="text-2xl font-bold text-white mb-2">No tienes entregas activas</h3>
            <p className="text-white/70 mb-6">
              Busca nuevos pedidos para comenzar a ganar
            </p>
            <Button
              onClick={() => window.location.href = '/repartidor/pedidos'}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90"
            >
              Buscar Pedidos
            </Button>
          </motion.div>
        ) : (
          activeDeliveries.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">
                        Pedido #{order.id}
                      </CardTitle>
                      <p className="text-white/70">{order.businessName}</p>
                      <p className="text-white/60 text-sm">
                        Cliente: {order.clientName}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                        En camino
                      </div>
                      <p className="text-white font-bold text-lg">${order.total.toFixed(2)}</p>
                      <p className="text-green-400 text-sm">
                        +${(order.total * 0.15).toFixed(2)} para ti
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Delivery Address */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-400" />
                          Dirección de entrega
                        </h4>
                        <p className="text-white/70">
                          {order.deliveryAddress.street}
                        </p>
                        <p className="text-white/70">
                          {order.deliveryAddress.city}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleNavigate(order.deliveryAddress)}
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Navegar
                      </Button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Productos a entregar:</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-white/70">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-3">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total del pedido:</span>
                        <span className="text-white">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleContactClient(order)}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contactar Cliente
                    </Button>
                    <Button
                      onClick={() => handleCompleteDelivery(order)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar como Entregado
                    </Button>
                  </div>

                  {/* Delivery Instructions */}
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-medium mb-1">Instrucciones:</h5>
                    <p className="text-white/70 text-sm">
                      • Confirma la identidad del cliente antes de entregar
                    </p>
                    <p className="text-white/70 text-sm">
                      • Verifica que todos los productos estén incluidos
                    </p>
                    <p className="text-white/70 text-sm">
                      • Solicita calificación al completar la entrega
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveries;