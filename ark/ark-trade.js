
const { RichEmbed } = require('discord.js');
var fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const permissions = new Discord.Permissions(8);
function getIcon(name, client) {
    const setItem = client.emojis.find(emoji => emoji.name === name);
    return setItem;
}
//embeded item
function embededItem(client, embed,message) {
    let messageArray = message.content.split("\n");
    // Set the main content of the embed
    embed.setDescription(messageArray[1])
    embed.setColor(0xFF0000)
}



//Main translate
function trade(message, client) {
    if (message.channel.id == 614057351259095050) {
        let messageArray = message.content.split("\n");
        if (messageArray[0] == 'a') {
            try {
                permissions.add('MANAGE_MESSAGES', 'MANAGE_ROLES', 'ADMINISTRATOR');

                if (1 == 1 && message.member.id != 602517706155229185) {
                    if (permissions.has('MANAGE_MESSAGES') && message.deletable) {
                        message.delete()
                            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                            .catch(console.error);

                        const embed = new RichEmbed()
                        embed.setTitle("Liên hệ ngay !!!")
                        .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
                        /*
                         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                         */
                        .setColor(0x00AE86)
                        .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
                        .setImage("http://i.imgur.com/yVpymuV.png")
                        .setThumbnail("http://i.imgur.com/p2qNFag.png")
                        /*
                         * Takes a Date object, defaults to current date.
                         */
                        .setURL("https://www.google.com.vn/?hl=vi")
                        .addField("This is a field title, it can hold 256 characters",
                          "This is a field value, it can hold 1024 characters.")
                        /*
                         * Inline fields may not display as inline if the thumbnail and/or image is too big.
                         */
                        .addField("Inline Field", "They can also be inline.", true)
                        /*
                         * Blank field, useful to create some space.
                         */
                        .addBlankField(true)
                        .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
                        embededItem(client,embed,message)
                        message.channel.send(embed);
                    }
                }
            } catch{ console.log('not OK') }
        }
    }
}
module.exports = trade;