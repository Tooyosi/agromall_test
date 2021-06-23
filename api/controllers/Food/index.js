const { failedStatus, successStatus, successCode, failureCode, isBodyEmpty, bin2hashData, addMinutes, isValueEmpty, isEmailValid } = require('../../helpers')
const Response = require("../../helpers/ResponseClass")
const { logger } = require('../../loggers/logger')
const DbHelpers = require("../../helpers/DbHelpers")
const Models = require("../../models/index")
let dbHelper = new DbHelpers(Models, logger, failedStatus, successStatus, failureCode, successCode)

module.exports = {
    addCategory: ('/', async (req, res) => {
        let response
        try {
            let { name } = req.body
            name = name.trim()
            if (isValueEmpty("Category Name", name, res)) return
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
    })

}

