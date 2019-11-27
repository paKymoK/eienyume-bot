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
async function polygonalCrop(message, img) {
    img = await Canvas.loadImage(message.author.displayAvatarURL);
    var w = img.width;
    var h = img.height;
    const canvas = Canvas.createCanvas(300, 300);
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    var centerX = w / 2;
    var centerY = h / 2;
    var ang = 2 * Math.PI / 6;
    var len = Math.sin(ang / 2) * 2;
    var radius = Math.min(w / 2, h / 2) * Math.cos(ang / 2);
    ctx.translate(centerX, centerY);

    ctx.moveTo(-len / 2, -radius);

    for (var i = 0; i < 2 * Math.PI; i += ang) {
        ctx.rotate(ang);
        ctx.lineTo(len / 2, -radius);
    }
    ctx.closePath();

    ctx.clip();
    ctx.rotate(2 * Math.PI - i);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(img, 0, 0);

    return img;
}
async function getProfile(client, message) {
    if (message.content == '.profile') {
        const canvas = Canvas.createCanvas(1920, 1087);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./image/bg_world.jpg');
        const world = await Canvas.loadImage('./image/world.png');
        const houkai = await Canvas.loadImage('./image/houkai.png');
        const polygon = await Canvas.loadImage('./image/c_on.png');
        const alice = await Canvas.loadImage('./image/alice.png');
        // ctx.rotate(20 * Math.PI / 180);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        var houkaiworld = 100;
        ctx.drawImage(houkai, houkaiworld, 20);
        ctx.drawImage(world, houkaiworld + 100, 20);
        ctx.drawImage(alice, houkaiworld + 410, 70);
        ctx.drawImage(polygon, 50, 400);
        // ctx.fillText('Chào mừng đến với Alice ,', 220, 120);
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'houkai_world.png');
        message.channel.send(`Houkai World`, attachment);
    }
}
module.exports = { getProfile }