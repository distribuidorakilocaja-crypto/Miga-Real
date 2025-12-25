
import { SandwichType, Flavor } from './types';

export const COLORS = {
  primary: '#D62828', // Rojo Miga Real
  secondary: '#F7B733', // Amarillo
  white: '#FFFFFF',
  dark: '#1F2937'
};

export const PROMOS = [
  { id: 'p1', name: 'Promo 1', description: '12 Clásicos', price: 15000, classics: 12, specials: 0 },
  { id: 'p2', name: 'Promo 2', description: '24 Clásicos', price: 28000, classics: 24, specials: 0 },
  { id: 'p3', name: 'Promo 3', description: '12 Especiales + 12 Clásicos', price: 36000, classics: 12, specials: 12 },
  { id: 'p4', name: 'Promo 4', description: '30 Clásicos + 18 Especiales', price: 66500, classics: 30, specials: 18 }
];

export const FLAVORS: Flavor[] = [
  // Clásicos
  { id: 'c1', name: 'Jamón y Queso', type: SandwichType.CLASSIC },
  { id: 'c2', name: 'Salame y Queso', type: SandwichType.CLASSIC },
  { id: 'c3', name: 'Jamón, Lechuga y Tomate', type: SandwichType.CLASSIC },
  { id: 'c4', name: 'Jamón y Huevo', type: SandwichType.CLASSIC },
  { id: 'c5', name: 'Jamón, Zanahoria y Huevo', type: SandwichType.CLASSIC },
  { id: 'c6', name: 'Jamón, Tomate y Huevo', type: SandwichType.CLASSIC },
  { id: 'c7', name: 'Jamón Cocido, Morrón y Huevo', type: SandwichType.CLASSIC },
  // Especiales
  { id: 'e1', name: 'Crudo y Queso', type: SandwichType.SPECIAL },
  { id: 'e2', name: 'Crudo, Morrón y Huevo', type: SandwichType.SPECIAL },
  { id: 'e3', name: 'Jamón Cocido, Roque y Nuez', type: SandwichType.SPECIAL },
  { id: 'e4', name: 'Jamón Cocido, Choclo y Huevo', type: SandwichType.SPECIAL },
  { id: 'e5', name: 'Jamón y Atún', type: SandwichType.SPECIAL },
  { id: 'e6', name: 'Jamón, Atún y Huevo', type: SandwichType.SPECIAL },
  { id: 'e7', name: 'Queso y Atún', type: SandwichType.SPECIAL },
  { id: 'e8', name: 'Queso, Atún y Huevo', type: SandwichType.SPECIAL }
];

export const SHIPPING_ZONES = [
  { name: 'City Bell / Gorina / Gonnet', cost: 1500 },
  { name: 'Resto de La Plata', cost: 2500 },
  { name: 'Retiro en Local', cost: 0 }
];

export const UNIT_MIN = 6; // Media docena
