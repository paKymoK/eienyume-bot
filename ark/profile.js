const Canvas = require('canvas');
const Discord = require('discord.js');
// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text, size, bold) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = size;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        if (bold) {
            ctx.font = `bold ${fontSize -= 10}px Serif`;
        }
        else {
            ctx.font = `${fontSize -= 10}px Serif`;
        }
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
    if (message.content == '.me') {
        const canvas = Canvas.createCanvas(1920, 1087);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./image/bg.81e03143.jpg');
        const world = await Canvas.loadImage('./image/world.png');
        const houkai = await Canvas.loadImage('./image/houkai.png');
        const polygon = await Canvas.loadImage('./image/c_on.png');
        const rhode = await Canvas.loadImage('./image/item_rhodes.c10125c5.png')
        const card = await Canvas.loadImage('./image/card-removebg-preview.png')
        const avatar = await Canvas.loadImage('./image/avatar.jpg')
        const ori = await Canvas.loadImage('./image/item_origin.f524ea1a.png')
        const medic = await Canvas.loadImage('./image/medic.png')
        const medical = await Canvas.loadImage('./image/medical.png')
        const profileIcon = await Canvas.loadImage('./image/profile-icon.png')
        const reunion = await Canvas.loadImage('./image/reunion.png')
        // ctx.rotate(20 * Math.PI / 180);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        var houkaiworld = 100;
        // ctx.drawImage(world, houkaiworld + 100, 20);
        ctx.drawImage(reunion,-150,-20,800,800)
        ctx.drawImage(ori, houkaiworld, 50)
        ctx.drawImage(rhode, houkaiworld, 50)
        
        ctx.font = applyText(canvas, 'Quang Thai', 80,true);
        ctx.fillStyle = '#000000';
        ctx.fillText('Medic', 50, 775);
        ctx.drawImage(medic, 280, 700, 100, 100)



        //profile
        ctx.rect(1000, 50, 800, 150);
        ctx.stroke();
        ctx.globalAlpha = 0.7
        ctx.fillStyle = "black";
        ctx.fillRect(1000, 50, 800, 150);
        
        
        ctx.globalAlpha = 0.5
        ctx.fillRect(1000, 250, 800, 35);
        ctx.fillRect(1000, 520, 800, 35);
        ctx.fillRect(1000, 720, 800, 35);


        ctx.globalAlpha = 1;
        ctx.drawImage(profileIcon, 1005, 105, 32, 36)
        ctx.drawImage(medical, 1300, 0, 190, 280)
        ctx.font = applyText(canvas, 'Quang Thai', 30,false);
        ctx.fillStyle = '#ffffff'
        ctx.fillText('Basic info', 1010, 275);
        ctx.fillText('Physical Exam', 1010, 545);
        ctx.fillText('Clinical Analysis', 1010, 745);
        ctx.fillStyle = '#000000'
        const line = 25
        //basic info
        ctx.fillText('[Code Name] Wanderer', 1010, 310 + line*0);
        ctx.fillText('[Gender] Male', 1010, 310 + line*1);
        ctx.fillText('[Combat Experience] 3 month', 1010, 310 + line*2);
        ctx.fillText('[Place of Birth] Earth', 1010, 310 + line*3);
        ctx.fillText('[Date of Birth] 2 October', 1010, 310 + line*4);
        ctx.fillText('[Race] Human', 1010, 310 + line*5);
        ctx.fillText('[Height] 175cm', 1010, 310 + line*6);
        ctx.fillText('[Infection Status]', 1010, 310 + line*7);
        ctx.fillText('Non-infection as comfirmed by medical report.', 1010, 310 + line*8);
        //physical exam
        ctx.fillText('[Physical Strength] Outstanding', 1010, 580 + line*0);
        ctx.fillText('[Mobility] Outstanding', 1010, 580 + line*1);
        ctx.fillText('[Physical Resilience] Outstanding', 1010, 580 + line*2);
        ctx.fillText('[Tactical Acumen] Outstanding', 1010, 580 + line*3);
        ctx.fillText('[Combat Skill] Outstanding', 1010, 580 + line*4);
        ctx.fillText('[Originium Arts Assimilation] Outstanding', 1010, 580 + line*5);
        //clinical analysis
        ctx.fillText('Imaging tests reveal clear, normal outlines of internal organs,', 1010, 780 + line*0);
        ctx.fillText('and no abnormal shadows have been detected. Originium granules ', 1010, 780 + line*1);
        ctx.fillText('have not been detected in the circulatory system and there is ', 1010, 780 + line*2);     
        ctx.fillText('no sign of infection. At this time, is believed to be non-infected.', 1010, 780 + line*3);

        ctx.fillText('[Cell-Originium Assimilation] 0%', 1010, 780 + line*5);
        ctx.fillText('Wanderer showed no symptoms of Oripathy.', 1010, 780 + line*6);

        ctx.fillText('[Blood Originium-Crystal Density] 0.12u/L', 1010, 780 + line*8);
        ctx.fillText('Regularly operates in unknown environments, must take appropriate protective measures.', 1010, 780 + line*9);






        ctx.fillStyle = '#808080'
        ctx.fillText('________', 1450, 130);
        ctx.fillText('         File', 1510, 135);

        ctx.font = applyText(canvas, 'Quang Thai', 120,true); 
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Wanderer', 50, 920);
        // ctx.drawImage(polygon, 50, 400);
        ctx.scale(0.62, 0.62)
        ctx.drawImage(card, houkaiworld + 825, 1000)
        ctx.scale(1, 1)
        ctx.drawImage(avatar, houkaiworld + 920, 1060, 98, 126)
        ctx.font = applyText(canvas, 'Quang Thai', 30,true);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Wanderer', houkaiworld + 930, 1230);
        ctx.fillText('Veterinarians', houkaiworld + 930, 1270);

        ctx.font = applyText(canvas, 'Quang Thai', 25,false);
        ctx.fillStyle = '#237bbb';
        ctx.fillText('#0339', houkaiworld + 1040, 1290);
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'houkai_world.png');
        message.channel.send(`Arknight`, attachment);
    }
}
module.exports = { getProfile }