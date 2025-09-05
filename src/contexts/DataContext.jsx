import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Cargar datos desde localStorage o inicializar con datos de ejemplo
    const savedBusinesses = localStorage.getItem('deliveryApp_businesses');
    const savedOrders = localStorage.getItem('deliveryApp_orders');
    const savedProducts = localStorage.getItem('deliveryApp_products');
    const savedDeliveryPersons = localStorage.getItem('deliveryApp_deliveryPersons');
    const savedClients = localStorage.getItem('deliveryApp_clients');

    if (savedBusinesses) {
      setBusinesses(JSON.parse(savedBusinesses));
    } else {
      const initialBusinesses = [
        {
          id: '1',
          name: 'Pizza Express',
          category: 'Comida Rápida',
          rating: 4.5,
          deliveryTime: '25-35 min',
          deliveryFee: 2.50,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
          location: { lat: 40.7128, lng: -74.0060 },
          isOpen: true,
          phone: '+1234567890',
          address: '123 Main St, New York, NY'
        },
        {
          id: '2',
          name: 'Burger Palace',
          category: 'Hamburguesas',
          rating: 4.2,
          deliveryTime: '20-30 min',
          deliveryFee: 3.00,
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
          location: { lat: 40.7589, lng: -73.9851 },
          isOpen: true,
          phone: '+1234567891',
          address: '456 Broadway, New York, NY'
        },
        {
          id: '3',
          name: 'Sushi Zen',
          category: 'Japonesa',
          rating: 4.8,
          deliveryTime: '30-45 min',
          deliveryFee: 4.00,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
          location: { lat: 40.7505, lng: -73.9934 },
          isOpen: true,
          phone: '+1234567892',
          address: '789 5th Ave, New York, NY'
        }
      ];
      setBusinesses(initialBusinesses);
      localStorage.setItem('deliveryApp_businesses', JSON.stringify(initialBusinesses));
    }

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initialProducts = [
        // Pizza Express
        { id: '1', businessId: '1', name: 'Pizza Margherita', price: 12.99, description: 'Tomate, mozzarella y albahaca fresca', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300', category: 'Pizzas' },
        { id: '2', businessId: '1', name: 'Pizza Pepperoni', price: 14.99, description: 'Pepperoni y mozzarella', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300', category: 'Pizzas' },
        { id: '3', businessId: '1', name: 'Coca Cola', price: 2.50, description: 'Refresco 500ml', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300', category: 'Bebidas' },
        
        // Burger Palace
        { id: '4', businessId: '2', name: 'Hamburguesa Clásica', price: 9.99, description: 'Carne, lechuga, tomate, cebolla', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', category: 'Hamburguesas' },
        { id: '5', businessId: '2', name: 'Hamburguesa BBQ', price: 11.99, description: 'Carne, salsa BBQ, cebolla caramelizada', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300', category: 'Hamburguesas' },
        { id: '6', businessId: '2', name: 'Papas Fritas', price: 4.99, description: 'Papas crujientes con sal', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300', category: 'Acompañamientos' },
        
        // Sushi Zen
        { id: '7', businessId: '3', name: 'Sushi Salmón', price: 8.99, description: '8 piezas de sushi de salmón', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300', category: 'Sushi' },
        { id: '8', businessId: '3', name: 'Roll California', price: 12.99, description: 'Cangrejo, aguacate, pepino', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300', category: 'Rolls' },
        { id: '9', businessId: '3', name: 'Té Verde', price: 3.50, description: 'Té verde japonés tradicional', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', category: 'Bebidas' }
      ];
      setProducts(initialProducts);
      localStorage.setItem('deliveryApp_products', JSON.stringify(initialProducts));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]);
    }

    if (savedDeliveryPersons) {
      setDeliveryPersons(JSON.parse(savedDeliveryPersons));
    } else {
      const initialDeliveryPersons = [
        {
          id: '1',
          name: 'Carlos Rodríguez',
          phone: '+1234567893',
          vehicle: 'Motocicleta',
          rating: 4.8,
          isOnline: false,
          currentLocation: { lat: 40.7128, lng: -74.0060 },
          totalDeliveries: 245,
          earnings: 1250.50
        },
        {
          id: '2',
          name: 'María González',
          phone: '+1234567894',
          vehicle: 'Bicicleta',
          rating: 4.9,
          isOnline: true,
          currentLocation: { lat: 40.7589, lng: -73.9851 },
          totalDeliveries: 189,
          earnings: 980.25
        }
      ];
      setDeliveryPersons(initialDeliveryPersons);
      localStorage.setItem('deliveryApp_deliveryPersons', JSON.stringify(initialDeliveryPersons));
    }

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients([]);
    }
  };

  const saveToStorage = (key, data) => {
    localStorage.setItem(`deliveryApp_${key}`, JSON.stringify(data));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveToStorage('orders', updatedOrders);
    return newOrder;
  };

  const updateOrder = (orderId, updates) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, ...updates } : order
    );
    setOrders(updatedOrders);
    saveToStorage('orders', updatedOrders);
  };

  const addBusiness = (business) => {
    const newBusiness = {
      ...business,
      id: Date.now().toString()
    };
    const updatedBusinesses = [...businesses, newBusiness];
    setBusinesses(updatedBusinesses);
    saveToStorage('businesses', updatedBusinesses);
    return newBusiness;
  };

  const updateBusiness = (businessId, updates) => {
    const updatedBusinesses = businesses.map(business =>
      business.id === businessId ? { ...business, ...updates } : business
    );
    setBusinesses(updatedBusinesses);
    saveToStorage('businesses', updatedBusinesses);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveToStorage('products', updatedProducts);
    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    saveToStorage('products', updatedProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    saveToStorage('products', updatedProducts);
  };

  const updateDeliveryPerson = (deliveryId, updates) => {
    const updatedDeliveryPersons = deliveryPersons.map(person =>
      person.id === deliveryId ? { ...person, ...updates } : person
    );
    setDeliveryPersons(updatedDeliveryPersons);
    saveToStorage('deliveryPersons', updatedDeliveryPersons);
  };

  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now().toString()
    };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveToStorage('clients', updatedClients);
    return newClient;
  };

  const value = {
    businesses,
    orders,
    products,
    deliveryPersons,
    clients,
    addOrder,
    updateOrder,
    addBusiness,
    updateBusiness,
    addProduct,
    updateProduct,
    deleteProduct,
    updateDeliveryPerson,
    addClient
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};