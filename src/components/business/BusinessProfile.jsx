import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Save, Store, MapPin, Phone, Clock, DollarSign } from 'lucide-react';

const BusinessProfile = () => {
  const { user } = useAuth();
  const { businesses, updateBusiness } = useData();
  const { toast } = useToast();
  
  const business = businesses.find(b => b.id === user?.businessId) || businesses[0];
  
  const [profile, setProfile] = useState({
    name: business?.name || '',
    category: business?.category || '',
    phone: business?.phone || '',
    address: business?.address || '',
    deliveryTime: business?.deliveryTime || '',
    deliveryFee: business?.deliveryFee || '',
    image: business?.image || ''
  });

  const handleSave = () => {
    const updatedData = {
      ...profile,
      deliveryFee: parseFloat(profile.deliveryFee) || 0
    };
    
    updateBusiness(business.id, updatedData);
    toast({
      title: "Perfil actualizado",
      description: "Los datos de tu negocio se han guardado correctamente",
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
          Perfil del Negocio
        </h1>
        <p className="text-white/70 text-lg">
          Administra la información de tu restaurante
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Business Info Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Store className="w-5 h-5" />
                Información del Negocio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Nombre del restaurante</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">Categoría</Label>
                  <Input
                    id="category"
                    value={profile.category}
                    onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                    placeholder="Ej: Comida Rápida, Italiana, Mexicana"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-white">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+52 123 456 7890"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime" className="text-white">Tiempo de entrega</Label>
                  <Input
                    id="deliveryTime"
                    value={profile.deliveryTime}
                    onChange={(e) => setProfile({ ...profile, deliveryTime: e.target.value })}
                    placeholder="Ej: 25-35 min"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-white">Dirección</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Dirección completa del restaurante"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryFee" className="text-white">Costo de envío ($)</Label>
                  <Input
                    id="deliveryFee"
                    type="number"
                    step="0.01"
                    value={profile.deliveryFee}
                    onChange={(e) => setProfile({ ...profile, deliveryFee: e.target.value })}
                    placeholder="0.00"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="text-white">URL de imagen</Label>
                  <Input
                    id="image"
                    value={profile.image}
                    onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar cambios
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Business Preview */}
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <img
                  src={business?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'}
                  alt={business?.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">{business?.name}</h3>
                <p className="text-white/70">{business?.category}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{business?.address || 'Sin dirección'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{business?.phone || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{business?.deliveryTime || 'Sin tiempo definido'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">${business?.deliveryFee || 0} envío</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Status */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Estado del Negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Estado</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    business?.isOpen ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-white font-medium">
                    {business?.isOpen ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Calificación</span>
                <span className="text-white font-bold">⭐ {business?.rating}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  toast({
                    title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
                  });
                }}
              >
                {business?.isOpen ? 'Cerrar negocio' : 'Abrir negocio'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessProfile;