import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import DeliveryMap from '@/components/maps/DeliveryMap';

const RealtimeMap = () => {
  const { orders, deliveryPersons } = useData();
  const activeDeliveries = orders.filter(order => order.status === 'delivering');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Mapa en Tiempo Real
        </h1>
        <p className="text-white/70 text-lg">
          Sigue todas las entregas activas en la plataforma
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-0 h-[600px]">
          <CardContent className="p-0 h-full">
            {activeDeliveries.length > 0 ? (
              <DeliveryMap
                order={activeDeliveries[0]}
                deliveryPerson={deliveryPersons.find(d => d.id === activeDeliveries[0].deliveryPersonId)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No hay entregas activas</h3>
                  <p className="text-white/70">
                    Las entregas en curso aparecerán aquí en tiempo real
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RealtimeMap;