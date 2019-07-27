/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */
//no image : https://rafver.is/wp-content/uploads/2016/05/no-image.jpg
// Import the discord.js module
// const token = process.env.MY_API_KEY;

const Discord = require('discord.js');
require('dotenv').config();
console.log(process.env.MY_API_KEY);

const { Client, Attachment, RichEmbed } = require('discord.js');
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
  let messageArray = message.content.split(" ");
  var id = -1;
  function logArrayElements(element, index) {
    let idArray = element.id.split(",");
    idArray.forEach(elements => {
      if (elements === messageArray[1]) {
        id = index;
        console.log(index);
      }
    });
  }
  
  // If the message is "how to embed"
  if (messageArray[0] === "!vn") {
    json.forEach(logArrayElements);
    if (id != -1) {
      const setItem = client.emojis.find(emoji => emoji.name === json[id].set);
      const starNumber = client.emojis.find(emoji => emoji.name === json[id].rarity);
      const star = client.emojis.find(emoji => emoji.name === "star");
      const attribute = client.emojis.find(emoji => emoji.name === json[id].attribute);
      const embed = new RichEmbed()
        .setTitle(setItem + " " + json[id].name)
        .setFooter("Slave của Wanderer")
        .setTimestamp()
      //Nếu là Wea/badge/Armor thì add 
      if (json[id].attribute === "") {
        // Set the main content of the embed
        embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
          "Loại : " + json[id].type + "\n" + "\n" +
          "ID : " + json[id].id + "\n" + "\n" +
          "Set : " + setItem + json[id].set
        )
      } else {
        // Set the main content of the embed
        embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
          "Loại : " + json[id].type + "\n" + "\n" +
          "ID : " + json[id].id + "\n" + "\n" +
          "Thuộc tính :" + attribute + "\n" + "\n" +
          "Set : " + setItem + json[id].set
        )
      }
      embed.setThumbnail(json[id].thumbnail)
        // Set the title of the field
        .addField("Effect 1 : " + json[id].skill1name, json[id].skill1)
        .addField("Effect 2 : " + json[id].skill2name, json[id].skill2)
      if (json[id].type === "Áo") {
        embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
          "Máu cơ bản : " + json[id].basehp + "\n" + "```")
      } else {
        if (json[id].type === "Huy hiệu") {
          embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" + "```")
        } else {
          //weapon
          embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
            "Sát thương : " + json[id].basedame + "\n"
            + "Tốc độ : " + json[id].attackspeed + " /s" + "\n"
            + "Đạn : " + json[id].ammo + "```")
        }
      }
      if (json[id].moe === "Có") {
        embed.setImage(json[id].linkmoe)
      }
      // Set the color of the embed
      embed.setColor(0xFF0000)
      // Send the embed to the same channel as the message
      message.channel.send(embed);
    } else {
      message.channel.send("Không biết đâu :( ");
    }
    // if(messageArray[0]=== "!!"){
    //   message.channel.send("Đờ mờ Master bắt tao học lắm vl dỗi dcd");
    // }
  }
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.MY_API_KEY);