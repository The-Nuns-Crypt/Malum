module.exports = {
    name: 'unbind',
    description: '~',
    async execute(interaction) {
        try {
            // Defer the reply to prevent timeout
            await interaction.deferReply()

            const roles = interaction.guild.roles.cache.filter(role => role.editable && role.id !== interaction.guild.id)
            let deletedRoles = []

            for (const role of roles.values()) {
                try {
                    await role.delete()
                    deletedRoles.push(`Deleted role: ${role.name}`)
                } catch (err) {
                    deletedRoles.push(`Failed to delete: ${role.name}`)
                }
            }

            await interaction.editReply(`Roles deleted:\n---[[--]]---\n${deletedRoles.join('\n')}\n---[[--]]---`)
        } catch (err) {
            console.error(`Error during unbind: ${err.message}`)
            await interaction.editReply('An error occurred while unbinding roles.')
        }
    }
}
