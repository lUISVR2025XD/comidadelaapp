import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import { Users, Store, Truck, User, Search } from 'lucide-react';

const UserManagement = () => {
  const { businesses, deliveryPersons, clients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('clients');

  const allUsers = {
    clients: clients.map(c => ({ ...c, type: 'Cliente' })),
    businesses: businesses.map(b => ({ ...b, type: 'Negocio' })),
    deliveryPersons: deliveryPersons.map(d => ({ ...d, type: 'Repartidor' })),
  };

  const filteredUsers = allUsers[activeTab].filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tabs = [
    { id: 'clients', label: 'Clientes', icon: User, count: clients.length },
    { id: 'businesses', label: 'Negocios', icon: Store, count: businesses.length },
    { id: 'deliveryPersons', label: 'Repartidores', icon: Truck, count: deliveryPersons.length },
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
          Gestión de Usuarios
        </h1>
        <p className="text-white/70 text-lg">
          Administra todos los usuarios de la plataforma
        </p>
      </motion.div>

      {/* Tabs and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 rounded-2xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              placeholder={`Buscar ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </motion.div>

      {/* User List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-white">
              Lista de {tabs.find(t => t.id === activeTab)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/70 text-sm">{user.email || user.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">{user.type}</p>
                    {user.rating && (
                      <p className="text-yellow-400 text-sm">⭐ {user.rating}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/70">No se encontraron usuarios</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserManagement;