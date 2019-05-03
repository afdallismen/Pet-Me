const ax = require('axios')
const express = require('express')
const router = express.Router()
const querystring = require('querystring')

router.use(express.json())
router.use(express.urlencoded({extended:false}))
let baseURL = "https://api.petfinder.com/v2"

class Organizations{
    
    static getAll(req, res){
        let query = (req.query)
        let qs = querystring.stringify(query)
        let url = `${baseURL}/organizations?${qs}`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(organizations => {
            res.status(200).json(organizations.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

    static getById(req, res){
        let url = `${baseURL}/organizations/${req.params.id}`
        console.log(url)
        ax({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then(organization => {
            res.status(200).json(organization.data)
        }).catch(err => {
            res.status(500).json(err.errors)
        })
    }

}

module.exports = Organizations