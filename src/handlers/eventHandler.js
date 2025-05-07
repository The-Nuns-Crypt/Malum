const fs = require('fs')
const path = require('path')

function loadEvents(malum) {
    const eventsPath = path.join(__dirname, '../events')
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file))
        if (event.name) {
            malum.on(event.name, (...args) => event.execute(...args, malum))
            console.log(`Loaded event: ${event.name}`)
        }
    }
}

module.exports = { loadEvents }