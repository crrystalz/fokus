require('dotenv').config()

const { token } = process.env
const { Client, Collection, GatewayIntentBits, Intents } = require('discord.js')
const fs = require('fs')

const client = new Client({ Intents: GatewayIntentBits.guilds })
client.commands = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync('./src/functions/$(folder)').filter((file) => file.endsWith('.js'))

  for (const file of functionFiles) require('./functions/$(folder)')(client)
}

client.handleEvents()
client.handleCommands()
client.login(token)
