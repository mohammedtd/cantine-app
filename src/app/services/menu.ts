import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menus = [
    { 
      jour: 'Lundi', 
      plat: 'Poulet rôti', 
      dessert: 'Yaourt',
      description: 'Poulet fermier rôti au four, servi avec des haricots verts et une sauce au jus.',
      image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400',
      reserved: false
    },
    { 
      jour: 'Mardi', 
      plat: 'Poisson pané', 
      dessert: 'Fruit',
      description: 'Filet de colin pané maison, accompagné de frites dorées et d\'une rondelle de citron.',
      image: 'https://images.unsplash.com/photo-1678969406337-1869bb0c0dc4?w=400',
      reserved: false
    },
    { 
      jour: 'Mercredi', 
      plat: 'Steak haché', 
      dessert: 'Compote',
      description: 'Steak haché 100% bœuf, servi avec une purée maison et des carottes glacées.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      reserved: false
    },
    { 
      jour: 'Jeudi', 
      plat: 'Pâtes bolognaise', 
      dessert: 'Crème caramel',
      description: 'Pâtes fraîches avec une sauce bolognaise mijotée, saupoudrées de parmesan.',
      image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400',
      reserved: false
    },
    { 
      jour: 'Vendredi', 
      plat: 'Pizza', 
      dessert: 'Glace',
      description: 'Pizza margherita maison avec mozzarella fraîche, tomates et basilic.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      reserved: false
    },
  ];

  getMenus() {
    return this.menus;
  }

  toggleReservation(index: number) {
    this.menus[index].reserved = !this.menus[index].reserved;
  }

  getTotalReserved() {
    return this.menus.filter(m => m.reserved).length;
  }

}