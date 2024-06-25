const mongoose = require('mongoose')

process.loadEnvFile()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(success => {
        console.log('connected to database')
    })
    .catch(error => {
        console.log(error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^(\d{3}||\d{2})-[0-9]*/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        }
    }
})

personSchema.set('toJSON', {
    transform: (documnet, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)