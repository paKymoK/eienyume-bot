/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const token = 'NjAyNTE3NzA2MTU1MjI5MTg1.XTXvDA.XLiFPfI2nMmMMgJ04Z4BwOQrINM'
const Discord = require('discord.js');
const { Client, Attachment,RichEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();
//json parser
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});
// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'new-comer-board');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });
  client.on('message', message => {
    let array = message.content.split(" ");
    // If the message is "how to embed"
    if (array[0] ==="!vn") {
      // We can create embeds using the MessageEmbed constructor
      // Read more about all that you can do with the constructor
      // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
      const setItem = client.emojis.find(emoji => emoji.name === json[1].set);
      const starNumber = client.emojis.find(emoji => emoji.name === json[1].rarity);
      const star = client.emojis.find(emoji => emoji.name === "star");
      const embed = new RichEmbed()
      .setAuthor(json[1].name,json[1].icon)
      .setTitle("Số sao: " + starNumber +star + "\n")
      .setFooter("test")
      .setTimestamp()
      if(json[1].blank != "") {
        embed.addField(json[1].blank)
      } 
      embed.setThumbnail(json[1].thumbnail)
      .addField("Effect 1 : "+json[1].skill1name,json[1].skill1)
      .addField("Effect 2 : "+json[1].skill2name,json[1].skill2)
      .addField("Cost : ","```" +json[1].cost+"```")
        // Set the title of the field
        // Set the color of the embed
      .setColor(0xFF0000)
        // Set the main content of the embed
      .setDescription("Loại : " + json[1].type +"\n"+"\n"+
                      "ID : " + json[1].id +"\n" +"\n"+
                      "Set : "+ setItem + json[1].set
                       );
      // Send the embed to the same channel as the message
      message.channel.send(embed);
    }
  });
  

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);