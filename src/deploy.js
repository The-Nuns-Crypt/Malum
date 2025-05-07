const { REST, Routes } = require('@discordjs/rest')
require('dotenv').config()
const fs = require('fs')

const commands = []
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`)
    commands.push({
        name: command.name,
        description: `${command.name}`,
        type: 1
    })
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered commands.'))
    .catch(console.error)
