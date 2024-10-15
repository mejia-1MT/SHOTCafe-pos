import coffeeImage from '../../assets/menu/coffee.jpg'
import americanoImage from '../../assets/menu/americano.jpg'
import espressoImage from '../../assets/menu/espresso.jpg'
import flatWhiteImage from '../../assets/menu/flat white.jpg'
import latteImage from '../../assets/menu/latte.jpg'
import whiteImage from '../../assets/menu/white coffee.jpg'
import matchaImage from '../../assets/menu/matcha latte.jpg'

import frapImage from '../../assets/menu/frapp.jpg'
import mochaFrappImage from '../../assets/menu/mocha frapp.jpg'
import caramelFrappImage from '../../assets/menu/caramel frapp.jpg'
import chocoChipImage from '../../assets/menu/choco chip frapp.jpg'
import matchaFrappImage from '../../assets/menu/matcha frapp.jpg'

const drinksData = [
  // Coffee Drinks
  {
    name: 'Coffee',
    price: '2.50',
    image: coffeeImage,
    category: 'Coffee',
  },
  {
    name: 'Americano',
    price: '2.75',
    image: americanoImage,
    category: 'Coffee',
  },
  {
    name: 'Espresso',
    price: '2.00',
    image: espressoImage,
    category: 'Coffee',
  },
  {
    name: 'Flat White',
    price: '3.50',
    image: flatWhiteImage,
    category: 'Coffee',
  },
  {
    name: 'Latte',
    price: '3.75',
    image: latteImage,
    category: 'Coffee',
  },
  {
    name: 'White Coffee',
    price: '3.25',
    image: whiteImage,
    category: 'Coffee',
  },
  {
    name: 'Matcha Latte',
    price: '4.00',
    image: matchaImage,
    category: 'Coffee',
  },

  // Blended
  {
    name: 'Frappuccino',
    price: '4.50',
    image: frapImage,
    category: 'Blended',
  },
  {
    name: 'Mocha Frappuccino',
    price: '4.75',
    image: mochaFrappImage,
    category: 'Blended',
  },
  {
    name: 'Caramel Frappuccino',
    price: '4.75',
    image: caramelFrappImage,
    category: 'Blended',
  },
  {
    name: 'Choco Chip Frappuccino',
    price: '5.00',
    image: chocoChipImage,
    category: 'Blended',
  },
  {
    name: 'Matcha Frappuccino',
    price: '5.00',
    image: matchaFrappImage,
    category: 'Blended',
  },
]

export default drinksData
