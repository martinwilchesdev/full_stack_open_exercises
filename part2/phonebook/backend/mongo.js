const mongoose = require('mongoose')

const databaseName = 'phonebook_db'

if (process.argv.length < 3) {
    console.log("give a password, name and phone number arguments")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=FullStackOpenCluster`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({})
        .then(result => {
            if (result.length > 0) {
                console.log('phonebook:')
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
            }
            mongoose.connection.close()
        })
} else {
    const name = process.argv[3]
    const number = process[4]

    const person = new Person({ name, number })

    person.save()
        .then(response => {
            console.log('person saved!')
            mongoose.connection.close()
        })
}