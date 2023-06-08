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
    if(onCall.size < vc.members.size){
        onCall = vc.members;
        let people: Discord.User[] = [await client.users.fetch("700443591423819889"), await client.users.fetch("808864687704899605")];
        people.forEach(async(person) =>{
            (await person.createDM()).send("Somebody has joined the vc");
        });
        
    }
    
});

client.login(process.env.TOKEN);
