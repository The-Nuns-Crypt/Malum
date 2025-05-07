const { Client, GatewayIntentBits } = require('discord.js')
const { loadCommands } = require('./handlers/commandHandler')
const { loadEvents } = require('./handlers/eventHandler')
require('dotenv').config()

const malum = new Client({ intents: [GatewayIntentBits.Guilds] })

loadCommands(malum)
loadEvents(malum)

malum.once('ready', () => {
    console.log('Malum is awake.')
    malum.user.setPresence({
        activities: [{ name: 'wit my balls', type: 0 }],
        status: 'idle'
    })
})

malum.login(process.env.TOKEN)