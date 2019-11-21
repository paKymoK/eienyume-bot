var fs = require('fs');
const { RichEmbed } = require('discord.js');
var skillelite = JSON.parse(fs.readFileSync('./skillelite.json', 'utf8'));
function skillEliteEmbeded(skillelite){
    const skillEliteEmbeded = new RichEmbed()
    .setColor('#0099ff')
    .setTitle('???')
    .setAuthor(skillelite.name)
    .setDescription(skillelite.describle)
    .setThumbnail(skillelite.image)
    .addField('Điều kiện kích hoạt', skillelite.condition)
    // .addBlankField()
    // .addField('Inline field title', 'Some value here', true)
    // .addField('Inline field title', 'Some value here', true)
    // .addField('Inline field title', 'Some value here', true)
    .setImage(skillelite.image)
    .setTimestamp()
    .setFooter('Some footer text here', skillelite.image);
    return skillEliteEmbeded;
}
//message
function skillElite(message, client) {
    messagee = message.content.substr(1);
    messageArray = messagee.split(" ");
    if (message.content.charAt(0) == "#" && messageArray[0] == "skill") {
        skillelite.forEach(function (item, index, array) {
            if (skillelite[index].id == messageArray[1]) {
                // message.channel.send(skillEliteEmbeded(skillelite[index]));
            }
        })
    }

}
module.exports = skillElite;