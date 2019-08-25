const Discord = require('discord.js');
require('dotenv').config();
const { Client, Attachment, RichEmbed, Permissions } = require('discord.js');
const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
var fs = require('fs');
//fire base
var admin = require("firebase-admin");

var serviceAccount = require("./bot-discord-ggz-firebase-adminsdk-24d2f-11dc647e1a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bot-discord-ggz.firebaseio.com"
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("item");
ref.once("value", function (snapshot) {
  fs.writeFile('item.json', JSON.stringify(snapshot.val()), function (err) {
    if (err) throw err;
  });
});
ref.on("child_added", function (snapshot, prevChildKey) {
  ref.once("value", function (snapshotAll) {
    fs.writeFile('item.json', JSON.stringify(snapshotAll.val()), function (err) {
      if (err) throw err;
    });
  });
});
ref.on("child_removed", function (snapshot) {
  ref.once("value", function (snapshotAll) {
    fs.writeFile('item.json', JSON.stringify(snapshotAll.val()), function (err) {
      if (err) throw err;
    });
  });
});
ref.on("child_changed", function (snapshot) {
  ref.once("value", function (snapshotAll) {
    fs.writeFile('item.json', JSON.stringify(snapshotAll.val()), function (err) {
      if (err) throw err;
    });
  });
});

// Nothing hêre
var json = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
var badword = JSON.parse(fs.readFileSync('./badword.json', 'utf8'));



//discord part

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setPresence({
    game: {
      name: 'với lửa',
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


// client.on("typingStart", function (channel, user) {
//   if (channel.id == 603878285792772106) {
//     console.log(`Chào mừng ${user.tag} đến với kênh thử nghiệm`);
//     user.send('Chào mừng ``'+ `${user.tag}` +'`` đến với kênh thử nghiệm');
//   }
// });
client.on('message', message => {
  let messageArray = message.content.split(" ");
  messageArray.every(function (element) {
    if (element === badword[1]) {
      message.member.send('Nói ``' + badword[1] + '`` là hư')
      return false;
    }
    return true;
  })
});

//
try {
  client.on('message', message => {
    let messageArray = message.content.split(" ");
    var searchString = "";
    for (var i = 1; i < messageArray.length; i++) {
      searchString = searchString + messageArray[i];
      searchString = searchString.toLowerCase();
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
        message.channel.send('Không có món nào tên như nềy cả !!! ')
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
          message.channel.send(embed);
        }
      }
      if ((id != -1) && (count == 1)) {
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
        message.channel.send(embed);
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
        message.channel.send(embed);
      } else {
        message.channel.send("Không biết đâu :( ");
      }
    }
  });
} catch (error) {
  console.log("error")
}

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.MY_API_KEY);
