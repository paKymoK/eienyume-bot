const Canvas = require('canvas');
const Discord = require('discord.js');
// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
async function newMember(client, member) {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;

    const canvas = Canvas.createCanvas(963,300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./image/wallpaper.png');
    const yss = await Canvas.loadImage('./image/yss.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(yss, 300, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = "#ed0909";
    ctx.fillText('Chào mừng đến với Alice ,', 220, 120);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, member.displayName);
    ctx.fillStyle = '#ed0909';
    ctx.fillText(`${member.displayName}!`, 220, 180);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = "#ed0909";
    ctx.fillText('Giờ thì cút đi 凸(￣ヘ￣)', 220, 230);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(`${member}`,attachment);
}
module.exports = { newMember }