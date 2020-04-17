function boss(message, client) {
    if (message.member.guild.id == 447325615587196929 || message.member.id == 337641064720760852) {
        realMessage = message.content.substr(1);
        messageArray = realMessage.split(" ");
        if (message.content.charAt(0) == '.' && messageArray[0] == 'boss') {
            console.log(check);
        }
    }
}
module.exports = boss;