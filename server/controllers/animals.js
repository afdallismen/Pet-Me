const ax = require('axios')
const express = require('express')
const router = express.Router()
const querystring = require('querystring')

router.use(express.json())
router.use(express.urlencoded({extended:false}))
let baseURL = "https://api.petfinder.com/v2"

class Animals{
    
    static getAll(req, res){
        let query = (req.query)
        let qs = querystring.stringify(query)
        let url = `${baseURL}/animals?${qs}`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(animals => {
            res.status(200).json(animals.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

    static getById(req, res){
        let url = `${baseURL}/animals/${req.params.id}`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(animals => {
            res.status(200).json(animals.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

    static getTypes(req, res){
        let url = `${baseURL}/types`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(animals => {
            res.status(200).json(animals.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

    static getType(req, res) {
        let url = `${baseURL}/types/${req.params.type}`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(animals => {
            res.status(200).json(animals.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

    static getBreeds(req, res){
        let url = `${baseURL}/types/${req.params.type}/breeds`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(animals => {
            res.status(200).json(animals.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

}

module.exports = Animals