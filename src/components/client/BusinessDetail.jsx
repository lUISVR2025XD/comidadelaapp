import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';

const BusinessDetail = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { businesses, products } = useData();
  const { user } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('deliveryApp_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const business = businesses.find(b => b.id === businessId);
  const businessProducts = products.filter(p => p.businessId === businessId);

  if (!business) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white">Negocio no encontrado</h2>
        <Button onClick={() => navigate('/cliente')} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const categories = [...new Set(businessProducts.map(p => p.category))];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1, businessId, businessName: business.name }];
    }
    
    setCart(newCart);
    localStorage.setItem('deliveryApp_cart', JSON.stringify(newCart));
    
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    });
  };

  const updateQuantity = (productId, change) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean);
    
    setCart(newCart);
    localStorage.setItem('deliveryApp_cart', JSON.stringify(newCart));
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/cliente')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-white">Menú de {business.name}</h1>
      </motion.div>

      {/* Business Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-0 overflow-hidden">
          <div className="relative">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{business.name}</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{business.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{business.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>${business.deliveryFee} envío</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
              <div className="grid gap-4">
                {businessProducts
                  .filter(product => product.category === category)
                  .map((product, index) => (
                    <Card key={product.id} className="glass-card border-0">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-white mb-2">{product.name}</h4>
                            <p className="text-white/70 text-sm mb-3">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-white">${product.price}</span>
                              <div className="flex items-center gap-2">
                                {getItemQuantity(product.id) > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(product.id, -1)}
                                      className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="text-white font-medium w-8 text-center">
                                      {getItemQuantity(product.id)}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(product.id, 1)}
                                      className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => addToCart(product)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Agregar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        {cartItemsCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Tu pedido ({cartItemsCount})
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-white/60 text-sm">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/70">Envío</span>
                      <span className="text-white">${business.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-white">${(cartTotal + business.deliveryFee).toFixed(2)}</span>
                    </div>
                    
                    <Button
                      onClick={() => navigate('/cliente/carrito')}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90"
                    >
                      Ir al carrito
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BusinessDetail;