const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
var translate = require('./translate.js');
var welcome = require('./guildManager.js');
var skillelite = require('./skillelite.js');
var boss = require('./boss.js');
// var test = require('./test.js');
var canvas = require('./canvas.js');
//BEGIN
client.on('ready', () => {
  console.log('I am ready! ');
  client.user.setPresence({
    game: {
      name: 'Gun Girl - HouKai Gakuen',
      type: 'PLAYING'
    },
    status: 'online'
  })
});
//main
client.on('message', message => {
  //translate
  translate(message, client);
  //skillelite 
  skillelite(message, client);
  //boss
  boss(message, client)
  //Emoji
  welcome.getEmoji(client, message);
  //change Presence
  welcome.changePresence(client, message);
  //Crawl Data
  welcome.crawlData(client, message);
  //fake new member
  // test.fakeNewMember(client, message);
});
//async message
client.on('message', async message => {
	if (message.content === '.join') {
		client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	}
});
//new member
client.on('guildMemberAdd', async member => {
  // welcome.newMember(member);
  canvas.newMember(client, member);
});
//leave member
client.on('guildMemberRemove', member => {
  welcome.leaveMember(member);
})
//Create Channgel
function makeChannel(message) {
  let messageArray = message.content.split(" ");
  const server = message.guild;
  server.createChannel(messageArray[1], {
    type: 'text',
    permissionOverwrites: [{
      id: server.id,
      deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
      allow: []
    }]
  })
    .then(channel => {
      let category = server.channels.find(c => c.id == 630263336612659213 && c.type == "category");

      if (!category) throw new Error("Category channel does not exist");
      channel.setParent(category.id);
    }).catch(console.error);
}

function startCountdown(day, hour, minute, message) {
  try {
    var counter = Number(minute) + Number(hour) * 60 + Number(day) * 24 * 60;
    var interval = setInterval(() => {
      counter--;
      var mday = Math.floor(counter / 1440);
      var temp = counter - mday * 1440
      var mhour = Math.floor(temp / 60);
      var mminutes = counter - mday * 1440 - mhour * 60;
      let channelName = message.channel.name.split('-');
      message.channel.setName('▶' + '-' + channelName[1] + '-' + '⏱' + '-' + mday + 'n' + mhour + 'h' + mminutes + 'p')
      if (counter < 1) {
        // The code here will run when
        // the timer has reached zero.
        message.channel.setName('⏸' + '-' + channelName[1] + '-' + '⏱' + '-' + 'Hết-event')
        message.channel.send('ting ting')
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 60000);
  } catch {
    console.log(Error)
  }
};
client.on('message', message => {
  let channelName = message.channel.name.split('-');
  let messageArray = message.content.split(" ");
  let category = message.guild.channels.find(c => c.type == "category" && c.id == 630263336612659213)
  if (messageArray[0] == '!time' && message.member.id == 337641064720760852) {
    if (category) {
      try {
        message.channel.setName('▶' + '-' + channelName[0] + '-' + '⏱' + '-' + 'đang tính')
        startCountdown(messageArray[1], messageArray[2], messageArray[3], message)
        console.log(messageArray[1])
      } catch{
        message.channel.send("Nhập sai cú pháp r")
      }
    }
  }
})
client.on('message', message => {
  let messageArray = message.content.split(" ");
  if (messageArray[0] == '!event' && message.member.id == 337641064720760852) {
    makeChannel(message);
  }
})

client.on('message', message => {
  if (message.member.id == 337641064720760852) {
    if (message.content == '!leave') {
      message.guild.leave()
        .then(g => console.log(`Left the guild ${g}`))
        .catch(console.error);
      message.channel.send('Bot không còn ở đây nữa :( ')
    }
  }
})

const humandroid = [];
client.on('message', message => {
  if (message.channel.id != 598353995513462785) {
    let messageArray = message.content.split(" ");
    if (message.member.id == 337641064720760852) {
      if (messageArray[0] == '!add') {
        try { humandroid.push(messageArray[1]) }
        catch{ }
      }
      if (messageArray[0] == '!remove') {
        try {
          var pos = humandroid.indexOf(messageArray[1]);
          humandroid.splice(pos, 1)
        }
        catch{ }
      }
      if (messageArray[0] == '!list') {
        try {
          message.channel.send(humandroid);
        }
        catch{ }
      }
    }
    if (messageArray[0] == '!bot' && message.member.id == 337641064720760852) {
      humandroid.push(message.member.id);
    }
    if (messageArray[0] == '!notbot' && message.member.id == 337641064720760852) {
      var pos = humandroid.indexOf(message.member.id);
      humandroid.splice(pos, 1);
    }
    try {
      permissions.add('MANAGE_MESSAGES', 'MANAGE_ROLES', 'ADMINISTRATOR');
      // message.member.id == 337641064720760852 |
      // message.member.id == 458890981274681345 |
      humandroid.forEach(function (item, index, array) {
        console.log(item)
        if (message.member.id == item && messageArray[0] != '!bot' && messageArray[0] != '!notbot' && message.member.id != 602517706155229185) {
          var role = message.guild.roles.find(role => role.id === 599168921815482369);
          console.log(role)
          // message.member.addRole(role);
          // console.log(message.member.permissions.toArray(true));
          if (permissions.has('MANAGE_MESSAGES') && message.deletable) {
            message.delete()
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
            message.channel.send(message.content);
          }
        }
      });

    } catch{ console.log('not OK') }
  }
});
//https://cdn1.iconfinder.com/data/icons/ui-set-6/100/Question_Mark-512.png
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.MY_API_KEY);
