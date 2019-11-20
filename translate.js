
const { RichEmbed } = require('discord.js');
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./item.json', 'utf8'));
function getIcon(name, client) {
    const setItem = client.emojis.find(emoji => emoji.name === name);
    return setItem;
}
function translate(message, client) {
    //message.member.id == 337641064720760852 |
    if (message.member.guild.id == 447325615587196929 || message.member.id == 337641064720760852) {
        let messageArray = message.content.split(" ");
        var searchString = "";
        for (var i = 0; i < messageArray.length; i++) {
            searchString = searchString + messageArray[i];
            searchString = searchString.toLowerCase();
            // console.log(searchString);
        }
        searchString = searchString.substr(1);
        var id = -1;
        var count = 0;
        var idlist = [];
        var checkIdList500 = []
        var checkIdList1000 = []
        var checkIdList1500 = []
        var checkIdList2000 = []
        var checkIdList2500 = []
        var checkIdList3000 = []
        var checkIdList3500 = []

        function logArrayElements(element, index) {
            let idArray = element.id.split(",");
            idArray.forEach(elements => {
                if (elements != "" && Number(elements) < 500) {
                    checkIdList500.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 500 && Number(elements) < 1000) {
                    checkIdList1000.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 1000 && Number(elements) < 1500) {
                    checkIdList1500.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 1500 && Number(elements) < 2000) {
                    checkIdList2000.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 2000 && Number(elements) < 2500) {
                    checkIdList2500.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 2500 && Number(elements) < 3000) {
                    checkIdList3000.push(Number(elements));
                }
                if (elements != "" && Number(elements) > 3000 && Number(elements) < 3500) {
                    checkIdList3500.push(Number(elements));
                }
                if (elements === searchString) {
                    id = index;
                }
            });
        }
        function logArrayElementsByName(element, index) {

            let idArray = element.name.toLowerCase().split(" ");
            var noSpace = "";
            for (var i = 0; i < idArray.length; i++) {
                noSpace = noSpace + idArray[i];
            }
            if (noSpace.indexOf(searchString) != -1) {
                id = index;
                count++;
                idlist.push(id);
            }
        }
        //List ID
        if (messageArray[0] == ".list" && /^\d+$/.test(messageArray[1])) {
            // message.author.send("Danh sách item hiện tại.", { files: ["./item.json"] });
            json.forEach(logArrayElements);
            if (Number(messageArray[1] <= 500)) {
                message.channel.send("danh sách id từ 0 đến 500 đã dịch")
                message.channel.send(checkIdList500.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 500) && Number(messageArray[1] <= 1000)) {
                message.channel.send("danh sách id từ 500 đến 1000 đã dịch")
                message.channel.send(checkIdList1000.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 1000) && Number(messageArray[1] <= 1500)) {
                message.channel.send("danh sách id từ 1000 đến 1500 đã dịch")
                message.channel.send(checkIdList1500.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 1500) && Number(messageArray[1] <= 2000)) {
                message.channel.send("danh sách id từ 1500 đến 2000 đã dịch")
                message.channel.send(checkIdList2000.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 2000) && Number(messageArray[1] <= 2500)) {
                message.channel.send("danh sách id từ 2000 đến 2500 đã dịch")
                message.channel.send(checkIdList2500.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 2500) && Number(messageArray[1] <= 3000)) {
                message.channel.send("danh sách id từ 2500 đến 3000 đã dịch")
                message.channel.send(checkIdList3000.sort(function (a, b) { return a - b }));
            }
            if (Number(messageArray[1] > 3000) && Number(messageArray[1] <= 3500)) {
                message.channel.send("danh sách id từ 3000 đến 3500 đã dịch")
                message.channel.send(checkIdList3500.sort(function (a, b) { return a - b }));
            }
        }
        //check is number or string
        // tìm theo tên

        if (message.content.charAt(0) === "!" && !/^\d+$/.test(searchString)) {
            json.forEach(logArrayElementsByName);
            if (count == 0) {
                if (message.member.id != 602517706155229185) {
                    message.channel.send('Không có món nào tên như nềy cả !!! ')
                }
            }
            if ((id != -1) && (count > 1)) {
                var description = '';
                idlist.forEach(element => {
                    // console.log(element);
                    const setItem = client.emojis.find(emoji => emoji.name === json[element].set);
                    description = description + "Tên : " + setItem + " " + json[element].name + " `-` ID : " + json[element].id + " `-` Loại : " + json[element].type + "\n" + "\n"
                })
                if (description.length > 2000) {
                    message.channel.send('Từ này ngắn quá , làm ơn thêm chữ đi !!');
                } else {
                    const embed = new RichEmbed()
                        .setTitle('Danh sách đồ có chứa từ : ' + messageArray[1])
                        .setFooter("Slave của Wanderer")
                        .setTimestamp()
                        .setDescription(description + "\n" +
                            "Gõ ``!id <ID>`` để xem chi tiết món đó" + "\n" +
                            "Ví dụ ``!id 3012``");
                    embed.setColor(0xFF0000)
                    if (message.member.id != 602517706155229185) {
                        message.channel.send(embed);
                    }
                }
            }
            if ((id != -1) && (count == 1)) {
                const setItem = client.emojis.find(emoji => emoji.name === json[id].set);
                const starNumber = client.emojis.find(emoji => emoji.name === json[id].rarity);
                const star = client.emojis.find(emoji => emoji.name === "star");
                const attribute = client.emojis.find(emoji => emoji.name === json[id].attribute);
                const embed = new RichEmbed()
                    .setTitle(setItem + " " + json[id].name)
                    .setFooter("Slave của Pằng pằng chíu chíu")
                    .setTimestamp()
                //Nếu là Wea/badge/Armor thì add 
                if (json[id].attribute === "") {
                    // Set the main content of the embed
                    embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                        "Loại : " + json[id].type + "\n" + "\n" +
                        "ID : " + json[id].id + "\n" + "\n" +
                        "Set : " + setItem + " " + json[id].set
                    )
                } else {
                    if (json[id].type == 'Pet') {
                        let attribute = json[id].attribute.split(',')
                        if (json[id].rarity == 'five') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        if (json[id].rarity == 'six') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + ',' + getIcon(attribute[1], client) + ' ' + attribute[1] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        if (json[id].rarity == 'seven') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + ',' + getIcon(attribute[1], client) + ' ' + attribute[1] + ',' + getIcon(attribute[2], client) + ' ' + attribute[2] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        embed.setThumbnail(json[id].thumbnail)
                            .addField("Chỉ số : ", "```" + "Sát thương : " + json[id].basedame + "\n"
                                + "Tỉ lệ crit : " + json[id].crit + "```")
                            .addField(json[id].skill1kind, "```" + json[id].skill1name + " :" + "\n" + json[id].skill1 + "." + json[id].unlock + "```")
                            .addField(json[id].skill2kind, "```" + json[id].skill2name + " :" + "\n" + json[id].skill2 + "```")
                            .addField(json[id].skill3kind, "```" + json[id].skill3name + " :" + "\n" + json[id].skill3 + "```")
                    } else {
                        // Set the main content of the embed
                        embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                            "Loại : " + json[id].type + "\n" + "\n" +
                            "ID : " + json[id].id + "\n" + "\n" +
                            "Thuộc tính :" + attribute + "\n" + "\n" +
                            "Set : " + setItem + " " + json[id].set
                        )

                        embed.setThumbnail(json[id].thumbnail)
                            .addField("Effect 1 : " + json[id].skill1name, json[id].skill1)
                            .addField("Effect 2 : " + json[id].skill2name, json[id].skill2)
                        if (json[id].type == "Áo" && json[id].type != 'Pet') {
                            embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                                "Máu cơ bản : " + json[id].basehp + "\n" + "```")
                        } else {
                            if (json[id].type == "Huy hiệu" && json[id].type != 'Pet') {
                                embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" + "```")
                            } else {
                                try {//weapon
                                    if (json[id].type != 'Pet') {
                                        embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                                            "Sát thương : " + json[id].basedame + "\n"
                                            + "Tốc độ : " + json[id].attackspeed + " /s" + "\n"
                                            + "Đạn : " + json[id].ammo + "```")
                                    }
                                } catch{
                                    // console.log(Error) 
                                }

                            }
                        }
                        if (json[id].moe === "Có") {
                            embed.setImage(json[id].linkmoe)
                        }
                        embed.setColor(0xFF0000)
                    }
                    if (message.member.id != 602517706155229185) {
                        message.channel.send(embed);
                    }
                }
            }
        }
        // tìm theo id
        if (message.content.charAt(0) === "!" && /^\d+$/.test(searchString)) {
            json.forEach(logArrayElements);
            if (id != -1) {
                const setItem = client.emojis.find(emoji => emoji.name === json[id].set);
                const starNumber = client.emojis.find(emoji => emoji.name === json[id].rarity);
                const star = client.emojis.find(emoji => emoji.name === "star");
                const attribute = client.emojis.find(emoji => emoji.name === json[id].attribute);
                const embed = new RichEmbed()
                    .setTitle(setItem + " " + json[id].name)
                    .setFooter("Slave của Wanderer")
                    .setTimestamp()
                //Nếu là Wea/badge/Armor thì add 
                if (json[id].attribute === "") {
                    // Set the main content of the embed
                    embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                        "Loại : " + json[id].type + "\n" + "\n" +
                        "ID : " + json[id].id + "\n" + "\n" +
                        "Set : " + setItem + " " + json[id].set
                    )
                } else {
                    if (json[id].type == 'Pet') {
                        let attribute = json[id].attribute.split(',')
                        if (json[id].rarity == 'five') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        if (json[id].rarity == 'six') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + ',' + getIcon(attribute[1], client) + ' ' + attribute[1] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        if (json[id].rarity == 'seven') {
                            embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                                "Loại : " + json[id].type + "\n" + "\n" +
                                "ID : " + json[id].id + "\n" + "\n" +
                                "Thuộc tính :" + getIcon(attribute[0], client) + ' ' + attribute[0] + ',' + getIcon(attribute[1], client) + ' ' + attribute[1] + ',' + getIcon(attribute[2], client) + ' ' + attribute[2] + "\n" + "\n" +
                                "Set : " + setItem + " " + json[id].set
                            )
                        }
                        embed.setThumbnail(json[id].thumbnail)
                            .addField("Chỉ số : ", "```" + "Sát thương : " + json[id].basedame + "\n"
                                + "Tỉ lệ crit : " + json[id].crit + "```")
                            .addField(json[id].skill1kind, "```" + json[id].skill1name + " :" + "\n" + json[id].skill1 + "." + json[id].unlock + "```")
                            .addField(json[id].skill2kind, "```" + json[id].skill2name + " :" + "\n" + json[id].skill2 + "```")
                            .addField(json[id].skill3kind, "```" + json[id].skill3name + " :" + "\n" + json[id].skill3 + "```")

                    } else {
                        // Set the main content of the embed
                        embed.setDescription("Số sao: " + starNumber + star + "\n" + "\n" +
                            "Loại : " + json[id].type + "\n" + "\n" +
                            "ID : " + json[id].id + "\n" + "\n" +
                            "Thuộc tính :" + attribute + "\n" + "\n" +
                            "Set : " + setItem + " " + json[id].set
                        )
                        embed.setThumbnail(json[id].thumbnail)
                            .addField("Effect 1 : " + json[id].skill1name, json[id].skill1)
                            .addField("Effect 2 : " + json[id].skill2name, json[id].skill2)
                        if (json[id].type === "Áo" && json[id].type != 'Pet') {
                            embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                                "Máu cơ bản : " + json[id].basehp + "\n" + "```")
                        } else {
                            if (json[id].type === "Huy hiệu" && json[id].type != 'Pet') {
                                embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" + "```")
                            } else {
                                if (json[id].type != 'Pet') {
                                    //weapon
                                    embed.addField("Chỉ số : ", "```" + "Cost : " + json[id].cost + "\n" +
                                        "Sát thương : " + json[id].basedame + "\n"
                                        + "Tốc độ : " + json[id].attackspeed + " /s" + "\n"
                                        + "Đạn : " + json[id].ammo + "```")
                                }
                            }
                        }

                        if (json[id].moe === "Có") {
                            embed.setImage(json[id].linkmoe)
                        }
                        embed.setColor(0xFF0000)
                    }
                    if (message.member.id != 602517706155229185) {
                        message.channel.send(embed);
                    }
                }
            } else {
                if (message.member.id != 602517706155229185) {
                    message.channel.send("Chưa dịch đến đâu :) ");
                }
            }
        }
    }
}
module.exports = translate;