const Discord = require('discord.js');
const Filter = require('bad-words');
require('dotenv').config();
const { Client, Attachment, RichEmbed, Permissions } = require('discord.js');
const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
//bad word
var badword = JSON.parse(fs.readFileSync('./badword.json', 'utf8'));
var listbadword = badword.bad.split(",");
var filter = new Filter();
filter.addWords(...listbadword);
filter.addWords('ĐÈ')
//BEGIN
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setPresence({
    game: {
      name: 'Gun Girl HouKai Gakuen 2',
      type: 'PLAYING'
    },
    status: 'online'
  })
});
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'new-comers-board');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});
//ẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ
function removeUTF(element) {
  return element.replace(/đ/g, 'd-').replace(/Đ/g, 'D-')
    .replace(/ù/g, 'u`').replace(/Ù/g, 'U`')
    .replace(/À/g, 'A`').replace(/Á/g, 'A#').replace(/Â/g, 'A^')
    .replace(/Ã/g, 'A~').replace(/È/g, 'E`').replace(/É/g, 'E#').replace(/Ê/g, 'E^').replace(/Ì/g, 'I`')
    .replace(/Í/g, 'I#').replace(/Ò/g, 'O`').replace(/Ó/g, 'O#').replace(/Ô/g, 'O^').replace(/Õ/g, 'O~')
    .replace(/Ú/g, 'U#').replace(/Ă/g, 'A$').replace(/Ĩ/g, 'I~').replace(/Ũ/g, 'Ũ').replace(/Ơ/g, 'O*')
    .replace(/à/g, 'a`').replace(/á/g, 'a#').replace(/â/g, 'a^').replace(/ã/g, 'a~').replace(/è/g, 'e`')
    .replace(/é/g, 'e#').replace(/ê/g, 'e^').replace(/ì/g, 'i`').replace(/í/g, 'i#').replace(/ò/g, 'o`')
    .replace(/ó/g, 'o*').replace(/ô/g, 'o^').replace(/õ/g, 'o~').replace(/ú/g, 'u#').replace(/ă/g, 'aw')
    .replace(/ĩ/g, 'i~').replace(/ũ/g, 'U~').replace(/ơ/g, 'o*').replace(/Ư/g, 'U*').replace(/Ă/g, 'Aw')
    .replace(/Ạ/g, 'A.').replace(/Ả/g, 'A?').replace(/Ã/g, 'A~').replace(/Ầ/g, 'A^`').replace(/Ấ/g, 'A^*')
    .replace(/Ẫ/g, 'A^~').replace(/Ậ/g, 'A^.').replace(/Ằ/g, 'Aw`').replace(/Ắ/g, 'Aw*').replace(/Ẵ/g, 'Aw~')
  // huyền = `
  // sắc = #
  // phảy = *

}
//troll
client.on('message', message => {
  if (message.guild.id == 578607738230407172) {
    console.log(message.content)
  }
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
      let category = server.channels.find(c => c.name == "Event Timer" && c.type == "category");

      if (!category) throw new Error("Category channel does not exist");
      channel.setParent(category.id);
    }).catch(console.error);
}

function startCountdown(day, hour, minute, message) {
  var counter = Number(minute) + Number(hour) * 60 + Number(day) * 24 * 60;
  var interval = setInterval(() => {
    counter--;
    console.log(counter)

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
};
client.on('message', message => {
  let channelName = message.channel.name.split('-');
  let messageArray = message.content.split(" ");
  let category = message.guild.channels.find(c.type == "category" && c.id == 630263336612659213)
  if (messageArray[0] == '!time') {
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
  if (messageArray[0] == '!event') {
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

//maplestory ở đây 
// client.on('message', message => {
//   console.log(removeUTF(message.content)+'x')
//   console.log(filter.isProfane(removeUTF(message.content)));

// console.log(listbadword);
// let messageArray = message.content.split(" ");
// messageArray.every(function (element) {
//   listbadword.forEach(elements => {
//     if (element.toLowerCase() == elements.toLowerCase()) {
//       message.member.send('Nói ``' + elements + '`` là hư')
//       return false;
//     }
//   });

//   return true;
// })
// });
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
    if (messageArray[0] == '!bot') {
      humandroid.push(message.member.id);
    }
    if (messageArray[0] == '!notbot') {
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
console.log(client.guilds.array.toString)

//game khác  , đừng quan tâm 
client.on('message', message => {
  //message.member.id == 337641064720760852 |
  if (0 == 0) {
    let messageArray = message.content.split(" ");
    var searchString = "";
    for (var i = 1; i < messageArray.length; i++) {
      searchString = searchString + messageArray[i];
      searchString = searchString.toLowerCase();
      // console.log(searchString);
    }
    var id = -1;
    var count = 0;
    var idlist = [];
    function logArrayElements(element, index) {
      let idArray = element.id.split(",");
      idArray.forEach(elements => {
        if (elements === messageArray[1]) {
          id = index;
          // console.log(index);
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
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    if (messageArray[0] === "!tênthật") {
      message.channel.send(message.member.user.tag);
    }
    if (messageArray[0] === "!gacha") {
      var a = getRandomInt(100);
      console.log(a)

      if ((0 < a) && (a < 15)) {
        message.channel.send("màu Vàng");
      }
      if (a == 0) {
        message.channel.send("màu Hồng");
      }
      if (a >= 15) {
        message.channel.send("màu Xanh");
      }
      a = -1;
    }
    // tìm theo tên
    if (messageArray[0] === "!tên") {
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
          // Set the main content of the embed
          embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
            "Loại : " + json[id].type + "\n" + "\n" +
            "ID : " + json[id].id + "\n" + "\n" +
            "Thuộc tính :" + attribute + "\n" + "\n" +
            "Set : " + setItem + " " + json[id].set
          )
        }
        embed.setThumbnail(json[id].thumbnail)
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
        embed.setColor(0xFF0000)
        if (message.member.id != 602517706155229185) {
          message.channel.send(embed);
        }
      }
    }
    // tìm theo id
    if (messageArray[0] === "!id") {
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
          // Set the main content of the embed
          embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
            "Loại : " + json[id].type + "\n" + "\n" +
            "ID : " + json[id].id + "\n" + "\n" +
            "Thuộc tính :" + attribute + "\n" + "\n" +
            "Set : " + setItem + " " + json[id].set
          )
        }
        embed.setThumbnail(json[id].thumbnail)
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
        embed.setColor(0xFF0000)
        if (message.member.id != 602517706155229185) {
          message.channel.send(embed);
        }
      } else {
        if (message.member.id != 602517706155229185) {
          message.channel.send("Chưa dịch đến đâu :) ");
        }
      }
    }
  }
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.MY_API_KEY);
