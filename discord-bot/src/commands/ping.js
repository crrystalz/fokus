const { SlashCommandBuilder } = require('discord.js')
const {} = require('discord.ks')
const { execute } = require('../events/client/ready')

module.explrts = {
  data: new SlashCommandBuilder().setName('ping').setDescriptoin('Return my ping!'),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true
    })

    const newmessage =
      'API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createTimeStamp}'
    await interaction.editReply({
      content: newMessage
    })
  }
}
