import { useState } from 'react'
import testing from '../../../11415021.png'
import Slider from '../components/Home/Slider'
import Coffee from '../assets/coffee-02-stroke-rounded'

function Home() {
  const items = {
    coffee: 'Coffee',
    americano: 'Americano',
    espresso: 'Espresso',
    latte: 'Latte',
    matcha: 'Matcha',
    frappuccino: 'Frappuccino',
  }

  return (
    <div className="relative h-screen flex-1 overflow-hidden">
      {/* IMAGE */}
      <div className="absolute w-[45%] aspect-square bg-primary mt-[210px] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      <img
        src={testing}
        className="absolute rounded-full object-cover w-[70%] mt-[210px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      />

      <div className="flex flex-col justify-center items-center w-full mt-[50px]">
        <p className="w-[60%] font-dela font-bold text-primary text-center z-10 text-[60px] leading-none">
          BREW-TIFUL DAYS START WITH A SHOT
        </p>
        <div className="w-[1100px] h-[300px] mt-[70px] flex justify-between">
          <div className="w-[30%] h-full">
            <button className="relative w-[180px] aspect-video bg-primary ml-5 rounded-xl flex items-center justify-evenly transition-transform duration hover:translate-x-1 hover:-translate-y-1 hover:bg-green-500 hover:custom-shadow">
              <p className="pl-3 font-dela text-customWhite text-2xl">Drink!</p>
              <Coffee className="w-[40%] h-[40%] text-customWhite" />
            </button>
          </div>
          <div className="w-[25%] h-full flex flex-col items-center">
            <p className="text-primary text-md text-center mb-3">
              Here's what other people are trying
            </p>
            <div className="w-[90%] flex justify-evenly">
              <div className="w-[70px] aspect-square bg-primary rounded-full">
                <img src="" alt="Item 1" />
              </div>
              <div className="w-[70px] aspect-square bg-primary rounded-full">
                <img src="" alt="Item 2" />
              </div>
              <div className="w-[70px] aspect-square bg-primary rounded-full">
                <img src="" alt="Item 3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <Slider
        items={items}
        bgColor="bg-[#ffb81c]"
        rotate="rotate-[4deg]"
        zIndex={20}
      />
      <Slider
        items={items}
        startFromMiddle={true}
        bgColor="bg-[#e09a00]"
        rotate="-rotate-[4deg]"
        zIndex={0}
      />
    </div>
  )
}

export default Home
