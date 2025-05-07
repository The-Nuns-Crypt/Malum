module.exports = {
    name: 'interactionCreate',
    async execute(interaction, malum) {
        if (!interaction.isCommand()) return

        const command = malum.commands.get(interaction.commandName)
        if (!command) return

        try {
            await command.execute(interaction, malum)
            console.log(`Executed command: ${interaction.commandName}`)
        } catch (err) {
            console.error(`Error executing ${interaction.commandName}:`, err)
            interaction.reply({ content: 'There was an error executing this command.', ephemeral: true })
        }
    }
}