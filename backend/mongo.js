const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const DB_URL = `mongodb+srv://deployment:${password}@fullstack.aqmrn.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const addEntry = ({ name, number }) => {
  const phonebook = new Phonebook({ name, number })
  phonebook.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const fetchEntries = () => {
  Phonebook.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(`${entry.name}: ${entry.number}`)
    })
    mongoose.connection.close()
  })
}

const unkownOperation = () => console.log('Unknown operation')

switch (process.argv.length) {
  case 5:
    addEntry({ name: process.argv[3], number: process.argv[4] })
    break
  case 3:
    fetchEntries()
    break
  default:
    unkownOperation()
}
