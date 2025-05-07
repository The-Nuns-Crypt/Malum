const fs = require('fs')
const path = require('path')

function loadEvents(malum) {
    const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
        const event = require(`../events/${file}`)
        if (event.once) {
            malum.once(event.name, (...args) => event.execute(...args, malum))
        } else {
            malum.on(event.name, (...args) => event.execute(...args, malum))
        }
    }

    console.log(`Loaded ${eventFiles.length} events.`)
}

module.exports = { loadEvents }
