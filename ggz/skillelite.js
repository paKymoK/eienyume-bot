var fs = require('fs');
const { RichEmbed } = require('discord.js');
var skillelite = JSON.parse(fs.readFileSync('./ggz/skillelite.json', 'utf8'));
function skillEliteEmbeded(skillelite) {
    const skillEliteEmbeded = new RichEmbed()
        .setColor('#0099ff')
        .setTitle('Đánh giá : ' + skillelite.rarity)
        .setAuthor(skillelite.name)
        .setDescription("Loại : " + skillelite.type + "\n" + "\n" +
            "Điều kiện kích hoạt : " + skillelite.condition)
        .setThumbnail(skillelite.image)
        .addField('Tác dụng : ', skillelite.describle)
        // .addBlankField()
        .addField('Chỉ định : ', skillelite.counter, false)
        // .addField('Inline field title', 'Some value here', true)
        // .addField('Inline field title', 'Some value here', true)
        .setImage(skillelite.image)
        .setTimestamp()
        .setFooter('?????????');
    return skillEliteEmbeded;
}
//message
function skillElite(message, client) {
    messagee = message.content.substr(1);
    messageArray = messagee.split(" ");
    if (message.content.charAt(0) == "." && messageArray[0] == "skill") {
        skillelite.forEach(function (item, index, array) {
            if (item.id == messageArray[1]) {
                message.channel.send(skillEliteEmbeded(item));
            }
        })
    }

}
module.exports = skillElite;