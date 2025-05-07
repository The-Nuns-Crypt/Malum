const fs = require('fs')
const path = require('path')

function loadCommands(malum) {
    malum.commands = new Map()

    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        malum.commands.set(command.name, command)
    }

    console.log(`Loaded ${malum.commands.size} commands.`)
}

module.exports = { loadCommands }