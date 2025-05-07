const noblox = require('noblox.js')

module.exports = {
    name: 'bind',
    description: 'Binds Discord roles to Roblox ranks.',
    async execute(interaction) {
        const groupId = process.env.GROUP_ID
        if (!groupId) return interaction.reply('Group ID not configured.')

        await interaction.deferReply()

        const roles = await noblox.getRoles(groupId)
        if (!roles || roles.length === 0) return interaction.editReply('No roles found in the group.')

        roles.sort((a, b) => b.rank - a.rank)

        let createdRoles = []

        for (const role of roles) {
            const roleName = role.name
            const existingRole = interaction.guild.roles.cache.find(r => r.name === roleName)

            if (existingRole) {
                createdRoles.push(`${roleName} already exists.`)
                continue
            }

            try {
                const newRole = await interaction.guild.roles.create({
                    name: roleName,
                    reason: `Role created for Roblox group rank: ${roleName}`
                })
                createdRoles.push(`Created role: ${newRole.name}`)
            } catch {
                createdRoles.push(`Failed to create role: ${roleName}`)
            }
        }

        const formattedMessage = [
            'Created roles\n',
            '---[[--]]---\n',
            ...createdRoles,
            '\n---[[--]]---'
        ].join('\n')

        await interaction.editReply(`\`\`\`\n${formattedMessage}\n\`\`\``)
    }
}
