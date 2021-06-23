const { failedStatus, successStatus, successCode, failureCode, isBodyEmpty, bin2hashData, addMinutes, isValueEmpty, isEmailValid, addToObject } = require('../../helpers')
const Response = require("../../helpers/ResponseClass")
const { logger } = require('../../loggers/logger')
const DbHelpers = require("../../helpers/DbHelpers")
const Models = require("../../models/index")
let dbHelper = new DbHelpers(Models, logger, failedStatus, successStatus, failureCode, successCode)
const multer = require('multer')
const uploadFunction = require('../../helpers/multer')
const upload = uploadFunction('./uploads')
var uploader = upload.array('images', 3)
const fs = require('fs')

module.exports = {
    addCategory: ('/', async (req, res) => {
        let response
        try {
            let { name } = req.body
            if (isValueEmpty("Category Name", name, res)) return
            name = name.trim()
            await dbHelper.createUniqueInstance("category", {
                where: {
                    name: name
                }
            }, {
                name: name
            }, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),

    getCategories: ('/', async (req, res) => {
        try {
            await dbHelper.getAllInstance("category", {}, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),
    editCategory: ('/', async (req, res) => {
        try {
            let { id } = req.params
            let { name } = req.body
            name = name.trim()
            if (isValueEmpty("Category Name", name, res)) return

            await dbHelper.editInstance("category", {
                where: {
                    id: id
                }
            }, {
                name: name
            }, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),

    deleteCategory: ('/', async (req, res) => {
        try {
            let { id } = req.params

            await dbHelper.deleteInstance("category", {
                where: {
                    id: id
                }
            }, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),


    addMarket: ('/', async (req, res) => {
        let response
        uploader(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                logger.error(`error: ${err.message ? JSON.parse(err.message) : err.toString()}, payload: ${JSON.stringify(req.body)}`)
                response = new Response(failedStatus, err.message ? err.message : err.toString(), failureCode, {})
                return res.status(400)
                    .send(response)
            } else if (err) {
                logger.error(err.toString())
                response = new Response(failedStatus, error.toString(), failureCode, {})
                return res.status(400)
                    .send(response)
            }
            else {
                try {
                    let { name, description, categoryId, address } = req.body

                    if (req.files && req.files.length !== 3) {
                        response = new Response(failedStatus, "3 image files are required", failureCode, {})
                        return res.status(400)
                            .send(response)
                    }
                    if (isValueEmpty("Market Name", name, res)) return
                    if (isValueEmpty("Market Description", description, res)) return
                    if (isValueEmpty("Market Category", categoryId, res)) return
                    if (isValueEmpty("Market address", address, res)) return
                    name = name.trim()
                    description = description.trim()
                    address = address.trim()
                    await dbHelper.createUniqueInstance("market", {
                        where: {
                            name: name
                        }
                    }, {
                        name: name,
                        description: description,
                        address: address,
                        categoryId: categoryId,
                        image1: req.files[0].path,
                        image2: req.files[1].path,
                        image3: req.files[2].path
                    }, res, Response)

                } catch (error) {
                    logger.error(error.toString())
                    response = new Response(failedStatus, error.toString(), failureCode, {})
                    return res.status(400)
                        .send(response)
                }
            }
        })


    }),

    editMarket: ('/', async (req, res) => {
        let response
        let { id } = req.params
        uploader(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                logger.error(`error during edit: ${err.message ? JSON.parse(err.message) : err.toString()}, payload: ${JSON.stringify(req.body)}`)
                response = new Response(failedStatus, err.message ? err.message : err.toString(), failureCode, {})
                return res.status(400)
                    .send(response)
            } else if (err) {
                logger.error(err.toString())
                response = new Response(failedStatus, error.toString(), failureCode, {})
                return res.status(400)
                    .send(response)
            }
            else {
                try {
                    let { name, description, categoryId, address } = req.body


                    let editObj = {}
                    addToObject("name", name, editObj)
                    addToObject("description", description, editObj)
                    addToObject("categoryId", categoryId, editObj)
                    addToObject("address", address, editObj)

                    let foundMarket = await Models.market.findOne({
                        where: {
                            id: id
                        }
                    })
                    if (!foundMarket) {
                        response = new Response(failedStatus, `Market Not Found`, failureCode, {})
                        return res.status(404).send(response)
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        let param = `image${i + 1}`
                        if (req.files && req.files[i] && req.files[i].path) {
                            let incomingFile = req.files[i].path
                            if (foundMarket[param] !== null) {
                                fs.unlinkSync(`./${foundMarket[param]}`)
                            }

                            editObj[param] = incomingFile
                        }
                    }

                    await foundMarket.update(editObj)
                    response = new Response(successStatus, successStatus, successCode, foundMarket)
                    return res.status(200).send(response)

                } catch (error) {
                    logger.error(error.toString())
                    response = new Response(failedStatus, error.toString(), failureCode, {})
                    return res.status(400)
                        .send(response)
                }
            }
        })
    }),

    getAllMarkets: ('/', async (req, res) => {
        let response
        try {
            await dbHelper.getAllInstance("market", {
                include: {
                    model: Models.category,
                    as: 'category',
                    attributes: ['name']

                }
            }, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),

    getSingleMarket: ('/', async (req, res) => {
        let response
        let { id } = req.params
        try {
            await dbHelper.getSingleInstance("market", {
                where: {
                    id: id
                },
                include: {
                    model: Models.category,
                    as: 'category',
                    attributes: ['name']

                }
            }, res, Response)

        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),
    deleteMarket: ('/', async (req, res) => {
        try {
            let { id } = req.params

            let foundMarket = await Models.market.findOne({
                where: {
                    id: id
                }
            })
            if (!foundMarket) {
                response = new Response(failedStatus, `Market Not Found`, failureCode, {})
                return res.status(404).send(response)
            }

            for (let i = 1; i <= 3; i++) {
                let param = `image${i}`
                
                if (foundMarket[param] !== null) {
                    try {
                        fs.unlinkSync(`./${foundMarket[param]}`)                        
                    } catch (error) {
                        
                    }
                }

            }

            await foundMarket.destroy()
            response = new Response(successStatus, successStatus, successCode, {})
            return res.status(200).send(response)


        } catch (error) {
            logger.error(error.toString())
            response = new Response(failedStatus, error.toString(), failureCode, {})
            return res.status(400)
                .send(response)
        }
    }),
}

