const { Attachment } = require('discord.js');
function newMember(member) {
    const channel = member.guild.channels.find(ch => ch.id == 631321386044096533);
    if (member.guild.id == 447325615587196929) {
        member.addRole('631831652070326282');
        if (!channel) return;
        channel.send(`${member} đã đến đêy`);
    }
}
function leaveMember(member) {
    const channel = member.guild.channels.find(ch => ch.id == 631321386044096533);
    if (!channel) return;
    channel.send(`${member} đã đi rồi ông giáo ơi :(`);
}
function getEmoji(client, message) {
    let messageArray = message.content.split(" ");
    const setItem = client.emojis.find(emoji => emoji.name === "cowboyPepe");
    if (messageArray == '#emo') {
        message.delete();
        message.channel.send(setItem + "");
    }
    if (messageArray[0] == '#set') {
        json.forEach(function (item, index, array) {
            console.log(item.set + " " + index)
        })
    }
}
function changePresence(client, message) {
    try {
        let messageArray = message.content.split(" ");
        message.member.roles.forEach(role => {
            if (role.id == 603875432214822913) {
                if (messageArray[0] == '#game') {
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
    } catch{
        console.log('error');
    }
}
function crawlData(client, message) {
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
}
module.exports = { newMember, leaveMember, getEmoji, changePresence, crawlData };