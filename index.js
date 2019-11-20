const Discord = require('discord.js');
require('dotenv').config();
const { Attachment, RichEmbed } = require('discord.js');
const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
var fs = require('fs');
var skillelite = JSON.parse(fs.readFileSync('./skillelite.json', 'utf8'));
var translate = require('./translate.js')
//test
// var test = require('./test.js')
// client.on('message', member => {
//       test(member);
// })
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
//skill elite 
client.on('message', member => {
  messagee = member.content.substr(1);
  messageArray = messagee.split(" ");
  if (member.content.charAt(0) == "#" && messageArray[0] == "skill") {
    console.log('check :' + skillelite);
    skillelite.forEach(function (item, index, array) {
      if (skillelite[index].id == messageArray[1]) {
        const skillEliteEmbeded = new Discord.RichEmbed()
          .setColor('#0099ff')
          .setTitle('Some title')
          .setURL('https://discord.js.org/')
          .setAuthor(skillelite[index].name)
          .setDescription('Some description here')
          .setThumbnail(skillelite[index].image)
          .addField('Điều kiện kích hoạt', 'Some value here')
          .addBlankField()
          .addField('Inline field title', 'Some value here', true)
          .addField('Inline field title', 'Some value here', true)
          .addField('Inline field title', 'Some value here', true)
          .setImage(skillelite[index].image)
          .setTimestamp()
          .setFooter('Some footer text here', skillelite[index].image);
        member.channel.send(skillEliteEmbeded);
      }
    })
  }

})
//new member
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.id == 631321386044096533);
  if (member.guild.id == 447325615587196929) {
    member.addRole('631831652070326282');
    if (!channel) return;
    channel.send(`${member} đã đến đêy`);
  }
});
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.id == 631321386044096533);
  if (!channel) return;
  channel.send(`${member} đã đi rồi ông giáo ơi :(`);
})
//list icon
client.on('message', message => {
  let messageArray = message.content.split(" ");
  const setItem = client.emojis.find(emoji => emoji.name === "cowboyPepe");
  if (messageArray == '!emo') {
    message.delete();
    message.channel.send(setItem + "");
  }
  if (messageArray[0] == '!set') {
    json.forEach(function (item, index, array) {
      console.log(item.set + " " + index)
    })
  }
})
//check role and change presence
client.on('message', message => {
  try {
    let messageArray = message.content.split(" ");
    message.member.roles.forEach(role => {
      if (role.id == 603875432214822913) {
        if (messageArray[0] == '!game') {
          client.user.setPresence({
            game: {
              name: messageArray[1],
              type: 'PLAYING'
            },
            status: 'online'
          })
        }
      }
    })
  } catch{ }
})
//Crawl Data
client.on('message', message => {
  let messageArray = message.content.split(" ");
  if (messageArray[0] == '!getguild') {
    console.log(message.guild.id);
    client.guilds.get()
  }
  //from announcer 
  if (message.channel.id == 261920000917372929) {
    let guild = client.guilds.get('447325615587196929')
    if (guild) {
      const channel = guild.channels.get('631127848975073300');
      if (channel) {
        try {
          channel.send(message.content);
          message.attachments.forEach(attachment => {
            // do something with the attachment
            const image = new Attachment(attachment.url);
            channel.send(image)
          });
        } catch{
          console.log(error)
        }
      }
      else console.log("There's no channel with that ID.")
    } else console.log(Error);
  }
  //update new event information
  if (message.channel.id == 276350988317753344) {
    let guild = client.guilds.get('447325615587196929')
    if (guild) {
      const channel = guild.channels.get('631129354297933826');
      if (channel) {
        try {
          channel.send(message.content);
          message.attachments.forEach(attachment => {
            // do something with the attachment
            const image = new Attachment(attachment.url);
            channel.send(image)
          });
        } catch{
          console.log(error)
        }
      }
      else console.log("There's no channel with that ID.")
    } else console.log(Error);
  }
  //update new kizuna
  if (message.channel.id == 617333577629040679) {
    let guild = client.guilds.get('447325615587196929')
    if (guild) {
      const channel = guild.channels.get('631129400426889236');
      if (channel) {
        try {
          channel.send(message.content);
          message.attachments.forEach(attachment => {
            // do something with the attachment
            const image = new Attachment(attachment.url);
            channel.send(image)
          });
        } catch{
          console.log(error)
        }
      }
      else console.log("There's no channel with that ID.")
    } else console.log(Error);
  }
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
client.on('message', message => {
  translate(message,client);
});

//https://cdn1.iconfinder.com/data/icons/ui-set-6/100/Question_Mark-512.png
// Log our bot in using the token from https://discordapp.com/developers/applications/me

client.login(process.env.MY_API_KEY);
