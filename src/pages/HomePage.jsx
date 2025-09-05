import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User, Store, Truck, Shield, MapPin, Clock, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: '', password: '', userType: '' });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const userTypes = [
    {
      type: 'cliente',
      title: 'Cliente',
      description: 'Ordena comida de tus restaurantes favoritos',
      icon: User,
      color: 'from-blue-500 to-purple-600',
      features: ['🍽️ Navegación de negocios', '🗺️ Seguimiento en tiempo real', '⭐ Calificaciones y reseñas']
    },
    {
      type: 'negocio',
      title: 'Negocio',
      description: 'Gestiona tu restaurante y recibe pedidos',
      icon: Store,
      color: 'from-green-500 to-teal-600',
      features: ['📊 Panel de administración', '💰 Control de ingresos', '🔔 Notificaciones de pedidos']
    },
    {
      type: 'repartidor',
      title: 'Repartidor',
      description: 'Entrega pedidos y gana dinero',
      icon: Truck,
      color: 'from-orange-500 to-red-600',
      features: ['🗺️ Navegación GPS', '💵 Control de ganancias', '📅 Historial de entregas']
    },
    {
      type: 'admin',
      title: 'Administrador',
      description: 'Gestiona toda la plataforma',
      icon: Shield,
      color: 'from-purple-500 to-pink-600',
      features: ['📈 Estadísticas globales', '👥 Gestión de usuarios', '🗺️ Seguimiento en tiempo real']
    }
  ];

  const handleLogin = (userType) => {
    const userData = {
      id: Date.now().toString(),
      email: loginData.email || `demo@${userType}.com`,
      name: loginData.email ? loginData.email.split('@')[0] : `Demo ${userType}`,
      userType,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userType}`
    };

    login(userData);
    toast({
      title: "¡Bienvenido!",
      description: `Has iniciado sesión como ${userType}`,
    });

    navigate(`/${userType}`);
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">VRtelolleva</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              La plataforma que conecta clientes, negocios y repartidores en un ecosistema completo de entregas a domicilio
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-white">Seguimiento en tiempo real</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-white">Entregas rápidas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Calidad garantizada</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Elige tu experiencia
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Accede a tu panel personalizado según tu rol en la plataforma
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((userType, index) => (
              <motion.div
                key={userType.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="glass-card border-0 p-6 h-full hover:scale-105 transition-all duration-300 group cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${userType.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <userType.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{userType.title}</h3>
                  <p className="text-white/70 mb-6">{userType.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {userType.features.map((feature, idx) => (
                      <div key={idx} className="text-sm text-white/60">
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className={`w-full bg-gradient-to-r ${userType.color} hover:opacity-90 transition-opacity`}
                        onClick={() => setLoginData({ ...loginData, userType: userType.type })}
                      >
                        Acceder como {userType.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-0">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center">
                          Acceder como {userTypes.find(u => u.type === loginData.userType)?.title}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email" className="text-white">Email (opcional)</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="demo@ejemplo.com"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsLoginOpen(false)}
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={() => handleLogin(loginData.userType)}
                            className={`flex-1 bg-gradient-to-r ${userTypes.find(u => u.type === loginData.userType)?.color} hover:opacity-90`}
                          >
                            Ingresar
                          </Button>
                        </div>
                        
                        <p className="text-xs text-white/60 text-center">
                          Modo demo: puedes ingresar sin credenciales
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Características principales
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mapas en Tiempo Real</h3>
              <p className="text-white/70">
                Seguimiento GPS preciso con OpenStreetMap y Leaflet para una experiencia de navegación superior
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Gestión Inteligente</h3>
              <p className="text-white/70">
                Sistema automatizado de asignación de pedidos y optimización de rutas para máxima eficiencia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Experiencia Premium</h3>
              <p className="text-white/70">
                Interfaz intuitiva, notificaciones en tiempo real y sistema de calificaciones para garantizar calidad
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;