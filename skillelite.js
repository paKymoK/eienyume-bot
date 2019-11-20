var fs = require('fs');
const { RichEmbed } = require('discord.js');
var skillelite = JSON.parse(fs.readFileSync('./skillelite.json', 'utf8'));
function skillElite(message, client) {
    messagee = message.content.substr(1);
    messageArray = messagee.split(" ");
    if (message.content.charAt(0) == "#" && messageArray[0] == "skill") {
        skillelite.forEach(function (item, index, array) {
            if (skillelite[index].id == messageArray[1]) {
                const skillEliteEmbeded = new RichEmbed()
                    .setColor('#0099ff')
                    .setTitle('Some title')
                    .setURL('')
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
                message.channel.send(skillEliteEmbeded);
            }
        })
    }

}
module.exports = skillElite;