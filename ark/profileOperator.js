const Discord = require('discord.js');
var fs = require('fs');
const { RichEmbed } = require('discord.js');
var json = JSON.parse(fs.readFileSync('./ark/ark-data/gamedata/en_US/gamedata/excel/character_table.json', 'utf8'));
var skilltable = JSON.parse(fs.readFileSync('./ark/ark-data/gamedata/en_US/gamedata/excel/skill_table.json', 'utf8'));
const time = 60000; // time limit: 1 min

const emojiNext = '➡'; // unicode emoji are identified by the emoji itself
const emojiPrevious = '⬅';
const reactionArrow = [emojiPrevious, emojiNext];
const maxPage = 2

function embedItem(message, client, operator) {
    //First page

    const url = "https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=" + operator.name

    let charCode = operator.potentialItemId.slice(2)
    // console.log(charCode)
    const opeIcon = client.emojis.find(emoji => emoji.name === charCode);
    let faction = "https://aceship.github.io/AN-EN-Tags/img/factions/" + operator.displayLogo + ".png"
    let rarity = ""
    for (let i = 0; i <= operator.rarity; i++) {
        rarity = rarity + "⭐"
    }
    let classes = client.emojis.find(emoji => emoji.name === operator.profession);

    let tag = "" + operator.position
    for (let i = 0; i < operator.tagList.length; i++) {
        tag = tag + "," + operator.tagList[i]
    }






    let imageLocalPath = "./ark/image/characters/" + charCode + "_2.png"
    if (operator.rarity < 3) {
        imageLocalPath = "./ark/image/characters/" + charCode + "_1.png"
    }
    let attachment = new Discord.Attachment(imageLocalPath, 'character.png');
    const stat = operator.phases[operator.phases.length - 1].attributesKeyFrames[operator.phases[operator.phases.length - 1].attributesKeyFrames.length - 1].data


    var find = '</>';
    var re = new RegExp(find, 'g');
    let description = operator.description.replace(/<@ba.kw>/g, '').replace(re, '')
    let talent1 = operator.talents[0].candidates[operator.talents[0].candidates.length - 1]
    let talent2 = null
    if (operator.talents.length == 2) {
        talent2 = operator.talents[1].candidates[operator.talents[operator.talents.length - 1].candidates.length - 1]
    }
    let talentDescription = ""
    if (operator.talents.length == 2) {
        talentDescription = "`" + talent1.name + "`" + "\n" + talent1.description.replace(/<@ba.talpu>/g, '').replace(re, '') + "\n" + "`" + talent2.name + "`" + "\n" + talent2.description.replace(/<@ba.talpu>/g, '').replace(re, '')
    }
    if (operator.talents.length == 1) {
        talentDescription = "`" + talent1.name + "`" + "\n" + talent1.description.replace(/<@ba.talpu>/g, '').replace(re, '')
    }

    let trustBonus = operator.favorKeyFrames[operator.favorKeyFrames.length - 1].data
    let trustBonusData = ""
    if (trustBonus != null) {
        Object.keys(trustBonus).forEach(function (k) {
            if (trustBonus[k] == 0 || trustBonus[k] == false || trustBonus[k] == true) {

            } else {
                trustBonusData = trustBonusData + k.toUpperCase() + " : " + trustBonus[k] + "\n"
            }
        })
    }

    const first = () => new Discord.RichEmbed()
        .setTitle(opeIcon + " " + operator.name)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .attachFile(attachment)
        .setImage('attachment://character.png')
        .setThumbnail(faction)
        /*
         * Takes a Date object, defaults to current date.
         */
        .setURL(url)
        .addField(rarity + " | " + classes,
            tag + ".")
        .addField("Trait", description + ".")
        .addField("Max HP", stat.maxHp, true)
        .addField("ATK", stat.atk, true)
        .addField("DEF", stat.def, true)
        .addField("RES", stat.magicResistance, true)
        .addField("Redeploy", stat.respawnTime + "s", true)
        .addField("Cost", stat.cost, true)
        .addField("Block", stat.blockCnt, true)
        .addField("ASPD", stat.baseAttackTime + "/s", true)
        .addField("Trust Bonus", " " + trustBonusData)
        .addField("Talent", talentDescription)

    let potentialData = ""
    let potential = operator.potentialRanks
    if (potential != null) {
        potentialData = "Potential" + "\n" + client.emojis.find(emoji => emoji.name === "1_") + " : " + potential[0].description + "\n"
            + "\n" + client.emojis.find(emoji => emoji.name === "2_") + " : " + potential[1].description + "\n"
            + "\n" + client.emojis.find(emoji => emoji.name === "3_") + " : " + potential[2].description + "\n"
            + "\n" + client.emojis.find(emoji => emoji.name === "4_") + " : " + potential[3].description + "\n"
            + "\n" + client.emojis.find(emoji => emoji.name === "5_") + " : " + potential[4].description
    }
    let skill = operator.skills
    let secondPage = new Discord.RichEmbed()
        .setTitle(opeIcon + " " + operator.name)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .attachFile(attachment)
        .setImage('attachment://character.png')
        .setThumbnail(faction)
        .setDescription(potentialData)

        /*
         * Takes a Date object, defaults to current date.
         */
        .setURL(url)
    Object.keys(skill).forEach(function (k) {
        let nameSkill = skilltable[skill[k].skillId].levels[skilltable[skill[k].skillId].levels.length - 1].name
        let descSkill = skilltable[skill[k].skillId].levels[skilltable[skill[k].skillId].levels.length - 1].description
        let blackBoard = skilltable[skill[k].skillId].levels[skilltable[skill[k].skillId].levels.length - 1].blackboard
        let spData = skilltable[skill[k].skillId].levels[skilltable[skill[k].skillId].levels.length - 1].spData
        let spType = ""
        if (spData.spType == 1) {
            spType = "`Auto Recovery`"
        }
        if (spData.spType == 2) {
            spType = "`Attack Recovery`"
        }
        if (spData.spType == 4) {
            spType = "`Getting Hit to Recovery`"
        }
        // console.log(blackBoard)
        descSkill = descSkill.replace(re, '').replace(/<@ba.vup>/g, '').replace(/<@ba.rem>/g, '').replace(/{/g, '').replace(/}/g, '')

        for (let i = 0; i < blackBoard.length; i++) {
            descSkill = descSkill.replace(blackBoard[i].key + ":0%", Math.round(blackBoard[i].value * 100) + "%")
            descSkill = descSkill.replace(blackBoard[i].key, blackBoard[i].value)
        }
        secondPage.addField(nameSkill, descSkill + "\n" +
            spType + "\n" + "Base Sp: " + spData.initSp + " - " + "Sp Cost: " + spData.spCost)
    })
    const second = () => secondPage

    const third = () => new Discord.RichEmbed()
        .setTitle(opeIcon + " " + operator.name)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .attachFile(attachment)
        .setImage('attachment://character.png')
        .setThumbnail(faction)
        .setDescription("Đang phát triển")

        /*
         * Takes a Date object, defaults to current date.
         */
        .setURL(url)

    const list = [first, second, third];



    function filter(reaction, user) {
        return (!user.bot) && (reactionArrow.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
    }

    function onCollect(emoji, message, i, getList) {
        if (emoji.name === emojiPrevious) {
            const embed = getList(i - 1);
            if (embed !== undefined) {
                message.edit(embed);
                i--;
            }
        } else if (emoji.name === emojiNext) {
            const embed = getList(i + 1);
            if (embed !== undefined) {
                message.edit(embed);
                i++;
            }
        }
        return i;
    }
 
    function createCollectorMessage(message, getList) {
        let i = 0;
        const collector = message.createReactionCollector(filter, { time });
        collector.on('collect', r => {
            i = onCollect(r.emoji, message, i, getList);
        });
        collector.on('end', collected => message.clearReactions());
    }
    function getList(i) {
        if ((-1 < i) && (i < maxPage)) {
            return list[i]().setTimestamp().setFooter(`Page ${i + 1}`);
        }
    }
    message.channel.send(getList(0))
        .then(msg => msg.react(emojiPrevious))
        .then(msgReaction => msgReaction.message.react(emojiNext))
        .then(msgReaction => createCollectorMessage(msgReaction.message, getList));
}


function findOperator(name) {
    let listOperator = []
    Object.keys(json).forEach(function (k) {
        let idArray = json[k].name.toLowerCase().split(" ");
        var noSpace = "";
        for (var i = 0; i < idArray.length; i++) {
            noSpace = noSpace + idArray[i];
        }
        if (noSpace.indexOf(name) != -1) {
            listOperator.push(json[k]);
        }
    });
    return listOperator;
}

function sendList(message, client) {

    if (message.member.guild.id == 447325615587196929 || message.member.id == 337641064720760852) {
        let messageArray = message.content.split(" ");
        var searchString = "";
        for (var i = 0; i < messageArray.length; i++) {
            searchString = searchString + messageArray[i];
            searchString = searchString.toLowerCase();
            // console.log(searchString);
        }
        searchString = searchString.substr(1);
        if (message.content.charAt(0) === "!") {
            const listOperator = findOperator(searchString)
            if (listOperator.length == 1) {
                operator = listOperator[0]
                embedItem(message, client, operator)
            }
            if (listOperator.length == 0) {
                message.channel.send(`Không có Operator nào tên như này cả !`)
            }
            if (listOperator.length > 1) {
                var description = '';
                listOperator.forEach(element => {
                    // console.log(element);
                    let charCode = element.potentialItemId.slice(2)
                    // console.log(charCode)
                    const opeIcon = client.emojis.find(emoji => emoji.name === charCode);
                    if (opeIcon != null) {
                        description = description + "Tên : " + opeIcon + "  " + element.name + "\n" + "\n"
                    } else {
                        description = description + "Tên : " + element.name + "\n" + "\n"
                    }

                })
                if (description.length > 2000) {
                    message.channel.send('Từ này ngắn quá , làm ơn thêm chữ đi !!');
                } else {
                    const embed = new RichEmbed()
                        .setTitle('Danh sách Operator có tên : ' + message.content.slice(1, message.content.length))
                        .setFooter("Slave của Wanderer")
                        .setTimestamp()
                        .setDescription(description + "\n" +
                            "Gõ ``!<tên>`` để xem chi tiết về Operator" + "\n" +
                            "Ví dụ ``!ifrit``")
                    embed.setColor(0xFF0000)
                    if (message.member.id != 602517706155229185) {
                        message.channel.send(embed);
                    }
                }
            }
        }
    }
}
module.exports = sendList;
