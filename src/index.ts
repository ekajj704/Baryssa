require("dotenv").config();
import Discord,{ IntentsBitField, Client } from "discord.js";

export const client=new Client({
    intents:[IntentsBitField.Flags.Guilds, IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.GuildVoiceStates],
});

let onCall: Discord.Collection<string, Discord.GuildMember> = new Discord.Collection<string, Discord.GuildMember>;

client.once("ready", () => {
    console.log("Bot online");
})

client.on(Discord.Events.VoiceStateUpdate, async(update) => {
    let vc = await client.channels.fetch("1029265216153858053") as Discord.VoiceBasedChannel;
    let people: Discord.User[] = [await client.users.fetch("700443591423819889"), await client.users.fetch("808864687704899605")];
    if(onCall.size < vc.members.size){
        onCall = vc.members;
        people.forEach(async(person) =>{
            (await person.createDM()).send(vc.members.last()?.nickname + " has joined the vc");
        });
        return;
    }
    onCall = vc.members;
    if(onCall.size === 0){
        people.forEach(async(person) =>{
            (await person.createDM()).send("Everyone has left the call");
        });
    }
    
});

client.login(process.env.TOKEN);
