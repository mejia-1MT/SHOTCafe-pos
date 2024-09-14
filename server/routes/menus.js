const express = require('express')
const Menu = require('../models/menuModels')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({mssg: 'GET all drinks'})
})

router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single drink'})
})

router.post('/', async (req, res) => {
  const {name, price, category, sold, image} = req.body
  
  try { 
    const menu = await Menu.create({name, price, category, sold, image})
    res.status(200).json(menu)
  } catch (error) {

  }
  
})

router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a new drink'})
})

router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a new drink'})
})

module.exports = router