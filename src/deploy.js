const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const fs = require('fs')
require('dotenv').config()

const commands = []

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push({
        name: command.name,
        description: command.description,
        options: command.options || [] // Include options if the command has any
    })
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

async function registerCommands() {
    try {
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Successfully registered slash commands.')
    } catch (error) {
        console.error('Error registering commands:', error)
    }
}

registerCommands()