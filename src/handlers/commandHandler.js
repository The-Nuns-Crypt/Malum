const fs = require('fs')
const path = require('path')

function loadCommands(malum) {
    malum.commands = new Map()

    const commandsPath = path.join(__dirname, '../commands')
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file))
        if (command.name) {
            malum.commands.set(command.name, command)
            console.log(`Loaded command: ${command.name}`)
        } else {
            console.log(`Skipped: ${file} (no name specified)`)
        }
    }

    console.log(`Total loaded commands: ${malum.commands.size}`)
}

module.exports = { loadCommands }