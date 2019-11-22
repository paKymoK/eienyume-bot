const Canvas = require('canvas');
const Discord = require('discord.js');
async function newMember(client, member) {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage('./image/wallpaper.png');
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
}
module.exports = { newMember }