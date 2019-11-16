const Discord = require('discord.js');
require('dotenv').config();
const { Client, Attachment, RichEmbed, Permissions } = require('discord.js');
const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
var skillelite = JSON.parse(fs.readFileSync('./skillelite.json', 'utf8'));

//BEGIN
client.on('ready', () => {
  console.log('I am ready!');
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
//check legit
client.on('message', message => {
  // console.log(message.guild.name)
})
//game khác  , đừng quan tâm 
//get icon 
function getIcon(name) {
  const setItem = client.emojis.find(emoji => emoji.name === name);
  return setItem;
}
client.on('message', message => {
  //message.member.id == 337641064720760852 |
  if (message.member.guild.id == 447325615587196929 || message.member.id == 337641064720760852) {
    let messageArray = message.content.split(" ");
    var searchString = "";
    for (var i = 0; i < messageArray.length; i++) {
      searchString = searchString + messageArray[i];
      searchString = searchString.toLowerCase();
      // console.log(searchString);
    }
    searchString = searchString.substr(1);
    var id = -1;
    var count = 0;
    var idlist = [];
    var checkIdList500 = []
    var checkIdList1000 = []
    var checkIdList1500 = []
    var checkIdList2000 = []
    var checkIdList2500 = []
    var checkIdList3000 = []
    var checkIdList3500 = []

    function logArrayElements(element, index) {
      let idArray = element.id.split(",");
      idArray.forEach(elements => {
        if (elements != "" && Number(elements) < 500) {
          checkIdList500.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 500 && Number(elements) < 1000) {
          checkIdList1000.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 1000 && Number(elements) < 1500) {
          checkIdList1500.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 1500 && Number(elements) < 2000) {
          checkIdList2000.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 2000 && Number(elements) < 2500) {
          checkIdList2500.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 2500 && Number(elements) < 3000) {
          checkIdList3000.push(Number(elements));
        }
        if (elements != "" && Number(elements) > 3000 && Number(elements) < 3500) {
          checkIdList3500.push(Number(elements));
        }
        if (elements === searchString) {
          id = index;
        }
      });
    }
    function logArrayElementsByName(element, index) {

      let idArray = element.name.toLowerCase().split(" ");
      var noSpace = "";
      for (var i = 0; i < idArray.length; i++) {
        noSpace = noSpace + idArray[i];
      }
      if (noSpace.indexOf(searchString) != -1) {
        id = index;
        count++;
        idlist.push(id);
      }
    }
    //List ID
    if (messageArray[0] == ".list" && /^\d+$/.test(messageArray[1])) {
      // message.author.send("Danh sách item hiện tại.", { files: ["./item.json"] });
      json.forEach(logArrayElements);
      if (Number(messageArray[1] <= 500)) {
        message.channel.send(checkIdList500);
      }
      if (Number(messageArray[1] > 500) && Number(messageArray[1] <= 1000)) {
        message.channel.send(checkIdList1000);
      }
      if (Number(messageArray[1] > 1000) && Number(messageArray[1] <= 1500)) {
        message.channel.send(checkIdList1500);
      }
      if (Number(messageArray[1] > 1500) && Number(messageArray[1] <= 2000)) {
        message.channel.send(checkIdList2000);
      }
      if (Number(messageArray[1] > 2000) && Number(messageArray[1] <= 2500)) {
        message.channel.send(checkIdList2500);
      }
      if (Number(messageArray[1] > 2500) && Number(messageArray[1] <= 3000)) {
        message.channel.send(checkIdList3000);
      }
      if (Number(messageArray[1] > 3000) && Number(messageArray[1] <= 3500)) {
        message.channel.send(checkIdList3500);
      }
    }
    //check is number or string
    // tìm theo tên

    if (message.content.charAt(0) === "!" && !/^\d+$/.test(searchString)) {
      json.forEach(logArrayElementsByName);
      if (count == 0) {
        if (message.member.id != 602517706155229185) {
          message.channel.send('Không có món nào tên như nềy cả !!! ')
        }
      }
      if ((id != -1) && (count > 1)) {
        var description = '';
        idlist.forEach(element => {
          // console.log(element);
          const setItem = client.emojis.find(emoji => emoji.name === json[element].set);
          description = description + "Tên : " + setItem + " " + json[element].name + " `-` ID : " + json[element].id + " `-` Loại : " + json[element].type + "\n" + "\n"
        })
        if (description.length > 2000) {
          message.channel.send('Từ này ngắn quá , làm ơn thêm chữ đi !!');
        } else {
          const embed = new RichEmbed()
            .setTitle('Danh sách đồ có chứa từ : ' + messageArray[1])
            .setFooter("Slave của Wanderer")
            .setTimestamp()
            .setDescription(description + "\n" +
              "Gõ ``!id <ID>`` để xem chi tiết món đó" + "\n" +
              "Ví dụ ``!id 3012``");
          embed.setColor(0xFF0000)
          if (message.member.id != 602517706155229185) {
            message.channel.send(embed);
          }
        }
      }
      if ((id != -1) && (count == 1)) {
        const setItem = client.emojis.find(emoji => emoji.name === json[id].set);
        const starNumber = client.emojis.find(emoji => emoji.name === json[id].rarity);
        const star = client.emojis.find(emoji => emoji.name === "star");
        const attribute = client.emojis.find(emoji => emoji.name === json[id].attribute);
        const embed = new RichEmbed()
          .setTitle(setItem + " " + json[id].name)
          .setFooter("Slave của Pằng pằng chíu chíu")
          .setTimestamp()
        //Nếu là Wea/badge/Armor thì add 
        if (json[id].attribute === "") {
          // Set the main content of the embed
          embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
            "Loại : " + json[id].type + "\n" + "\n" +
            "ID : " + json[id].id + "\n" + "\n" +
            "Set : " + setItem + " " + json[id].set
          )
        } else {
          if (json[id].type == 'Pet') {
            let attribute = json[id].attribute.split(',')
            if (json[id].rarity == 'five') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            if (json[id].rarity == 'six') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + ',' + getIcon(attribute[1]) + ' ' + attribute[1] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            if (json[id].rarity == 'seven') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + ',' + getIcon(attribute[1]) + ' ' + attribute[1] + ',' + getIcon(attribute[2]) + ' ' + attribute[2] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            embed.setThumbnail(json[id].thumbnail)
              .addField("Chỉ số : ", "```" + "Sát thương : " + json[id].basedame + "\n"
                + "Tỉ lệ crit : " + json[id].crit + "```")
              .addField(json[id].skill1kind, "```" + json[id].skill1name + " :" + "\n" + json[id].skill1 + "." + json[id].unlock + "```")
              .addField(json[id].skill2kind, "```" + json[id].skill2name + " :" + "\n" + json[id].skill2 + "```")
              .addField(json[id].skill3kind, "```" + json[id].skill3name + " :" + "\n" + json[id].skill3 + "```")
          } else {
            // Set the main content of the embed
            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
              "Loại : " + json[id].type + "\n" + "\n" +
              "ID : " + json[id].id + "\n" + "\n" +
              "Thuộc tính :" + attribute + "\n" + "\n" +
              "Set : " + setItem + " " + json[id].set
            )

            embed.setThumbnail(json[id].thumbnail)
              .addField("Effect 1 : " + json[id].skill1name, json[id].skill1)
              .addField("Effect 2 : " + json[id].skill2name, json[id].skill2)
            if (json[id].type == "Áo" && json[id].type != 'Pet') {
              embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                "Máu cơ bản : " + json[id].basehp + "\n" + "```")
            } else {
              if (json[id].type == "Huy hiệu" && json[id].type != 'Pet') {
                embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" + "```")
              } else {
                try {//weapon
                  if (json[id].type != 'Pet') {
                    embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                      "Sát thương : " + json[id].basedame + "\n"
                      + "Tốc độ : " + json[id].attackspeed + " /s" + "\n"
                      + "Đạn : " + json[id].ammo + "```")
                  }
                } catch{
                  // console.log(Error) 
                }

              }
            }
            if (json[id].moe === "Có") {
              embed.setImage(json[id].linkmoe)
            }
            embed.setColor(0xFF0000)
          }
          if (message.member.id != 602517706155229185) {
            message.channel.send(embed);
          }
        }
      }
    }
    // tìm theo id
    if (message.content.charAt(0) === "!" && /^\d+$/.test(searchString)) {
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
            "Set : " + setItem + " " + json[id].set
          )
        } else {
          if (json[id].type == 'Pet') {
            let attribute = json[id].attribute.split(',')
            if (json[id].rarity == 'five') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            if (json[id].rarity == 'six') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + ',' + getIcon(attribute[1]) + ' ' + attribute[1] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            if (json[id].rarity == 'seven') {
              embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                "Loại : " + json[id].type + "\n" + "\n" +
                "ID : " + json[id].id + "\n" + "\n" +
                "Thuộc tính :" + getIcon(attribute[0]) + ' ' + attribute[0] + ',' + getIcon(attribute[1]) + ' ' + attribute[1] + ',' + getIcon(attribute[2]) + ' ' + attribute[2] + "\n" + "\n" +
                "Set : " + setItem + " " + json[id].set
              )
            }
            embed.setThumbnail(json[id].thumbnail)
              .addField("Chỉ số : ", "```" + "Sát thương : " + json[id].basedame + "\n"
                + "Tỉ lệ crit : " + json[id].crit + "```")
              .addField(json[id].skill1kind, "```" + json[id].skill1name + " :" + "\n" + json[id].skill1 + "." + json[id].unlock + "```")
              .addField(json[id].skill2kind, "```" + json[id].skill2name + " :" + "\n" + json[id].skill2 + "```")
              .addField(json[id].skill3kind, "```" + json[id].skill3name + " :" + "\n" + json[id].skill3 + "```")

          } else {
            // Set the main content of the embed
            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
              "Loại : " + json[id].type + "\n" + "\n" +
              "ID : " + json[id].id + "\n" + "\n" +
              "Thuộc tính :" + attribute + "\n" + "\n" +
              "Set : " + setItem + " " + json[id].set
            )
            embed.setThumbnail(json[id].thumbnail)
              .addField("Effect 1 : " + json[id].skill1name, json[id].skill1)
              .addField("Effect 2 : " + json[id].skill2name, json[id].skill2)
            if (json[id].type === "Áo" && json[id].type != 'Pet') {
              embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                "Máu cơ bản : " + json[id].basehp + "\n" + "```")
            } else {
              if (json[id].type === "Huy hiệu" && json[id].type != 'Pet') {
                embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" + "```")
              } else {
                if (json[id].type != 'Pet') {
                  //weapon
                  embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                    "Sát thương : " + json[id].basedame + "\n"
                    + "Tốc độ : " + json[id].attackspeed + " /s" + "\n"
                    + "Đạn : " + json[id].ammo + "```")
                }
              }
            }

            if (json[id].moe === "Có") {
              embed.setImage(json[id].linkmoe)
            }
            embed.setColor(0xFF0000)
          }
          if (message.member.id != 602517706155229185) {
            message.channel.send(embed);
          }
        }
      } else {
        if (message.member.id != 602517706155229185) {
          message.channel.send("Chưa dịch đến đâu :) ");
        }
      }
    }
  }
});

//https://cdn1.iconfinder.com/data/icons/ui-set-6/100/Question_Mark-512.png
// Log our bot in using the token from https://discordapp.com/developers/applications/me

client.login(process.env.MY_API_KEY);
