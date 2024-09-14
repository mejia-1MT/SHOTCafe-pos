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
    title: 'Coffee',
    price: '2.50',
    image: coffeeImage,
    category: 'Coffee',
  },
  {
    title: 'Americano',
    price: '2.75',
    image: americanoImage,
    category: 'Coffee',
  },
  {
    title: 'Espresso',
    price: '2.00',
    image: espressoImage,
    category: 'Coffee',
  },
  {
    title: 'Flat White',
    price: '3.50',
    image: flatWhiteImage,
    category: 'Coffee',
  },
  {
    title: 'Latte',
    price: '3.75',
    image: latteImage,
    category: 'Coffee',
  },
  {
    title: 'White Coffee',
    price: '3.25',
    image: whiteImage,
    category: 'Coffee',
  },
  {
    title: 'Matcha Latte',
    price: '4.00',
    image: matchaImage,
    category: 'Coffee',
  },

  // Blended
  {
    title: 'Frappuccino',
    price: '4.50',
    image: frapImage,
    category: 'Blended',
  },
  {
    title: 'Mocha Frappuccino',
    price: '4.75',
    image: mochaFrappImage,
    category: 'Blended',
  },
  {
    title: 'Caramel Frappuccino',
    price: '4.75',
    image: caramelFrappImage,
    category: 'Blended',
  },
  {
    title: 'Choco Chip Frappuccino',
    price: '5.00',
    image: chocoChipImage,
    category: 'Blended',
  },
  {
    title: 'Matcha Frappuccino',
    price: '5.00',
    image: matchaFrappImage,
    category: 'Blended',
  },
]

export default drinksData
