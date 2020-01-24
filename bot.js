/**
 *MYSTERIOUS VOICE
 *Ver. 1.2.0
 *
 *Author: 
 *Seeker [@ᕕ( ᐛ )ᕗ#1363]
 *
 *Description:
 *Misterious Voice is a bot intended for Pokémon Mystery Dungeon roleplaying servers. 
 *The bot will pass a test by DM to the user and depending on the answers it will select a Pokémon, its 
 *Ability and its Movements based on random chance. BOT IS CURRENTLY IN ENGLISH ONLY.
 *
 *There are currently 52 different Pokémon from Generation 1 to 7.
**/

var Discord = require('discord.js');
var auth = require('./auth.json');
 
 
//Question sheet
let Questions = [];
Questions[0] = [
	[
		"\n**You have an exam. How do you prepare for it?\n**"+
		"1. Study a lot.\n"+
		"2. Last day.\n"+
		"3. Nah, I would rather play.\n",
	[
		"strong2", "placid2", "agitated2"
	]
	],
	[
		"\n**Do you have any concentration capacity?\n**"+
		"1. Yes.\n"+
		"2. No.\n",
	[
		"strong2;docile1", "weird2"
	]
	],
	[
		"\n**Do you usually face problems with a smile?\n**"+
		"1. Yes.\n"+
		"2. No.\n",
	[
		"strong2;audacious2", "rude2;weird2"
	]
	],
	[
	"\n**How do you like to sleep?\n**"+
	"1. With the light on.\n"+
	"2. With the light off.\n",
	[
	"fearful1;shy2", "serene2"
	]
	]
];
Questions[1] = [
	[
	"\n**You let a rotten egg fall in your bedroom! What do you do?\n**"+
	"1. Open the window!\n"+
	"2. Hold my breath.\n",
	[
	"docile2;active1", "reckless2;placid1"
	]
	],
	[
	"\n**A friend gives you something you forgot. How do you thank them?\n**"+
	"1. I say my thanks.\n"+
	"2. With a little joke.\n"+
	"3. Normal, without exaggerating.\n",
	[
	"docile2", "reckless1;shy1", "rude2"
	]
	],
	[
	"\n**Someone shouts at the other side of the door! What do you do?\n**"+
	"1. Open it as soon as possible!\n"+
	"2. Shout too!\n",
	[
	"strong1;audacious2", "reckless2"
	]
	],
	[
	"\n**Do you feel that recently you have been taking things more calmly?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"placid2", "agitated1;active2"
	]
	]
];
Questions[2] = [
	[
	"\n**A weird guy is bothering a girl in the middle of the street. What do you do?\n**"+
	"1. Help her without a doubt.\n"+
	"2. Help, but fearfully.\n"+
	"3. Nothing, out of fear.\n"+
	"4. Call the police.\n",
	[
	"audacious3", "strong2;audacious2", "fearful2", "docile1;fearful1;placid1"
	]
	],
	[
	"\n**Are you a cheerful person?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"cheerful2;reckless1", "rude1;weird1"
	]
	],
	[
	"\n**Do you like to make trouble when going out with your friends?\n**"+
	"1. Of course.\n"+
	"2. No.\n",
	[
	"cheerful2;shy1", "fearful1"
	]
	],
	[
	"\n**Do you see yourself as a boring person and too prudent?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"serene2;shy1", "strong2"
	]
	]
];
Questions[3] = [
	[
	"\n**Do you like bad jokes?\n**"+
	"1. I love them!\n"+
	"2. A bit.\n"+
	"3. Not at all.\n",
	[
	"agitated1;reckless3", "cheerful2", "rude2"
	]
	],
	[
	"\n**Do you usually laugh a lot?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"docile1;reckless2", "weird2"
	]
	],
	[
	"\n**Do others say that you are childish?\n**"+
	"1. Yes. \n"+
	"2. No.\n",
	[
	"cheerful1;reckless2", "serene2"
	]
	],
	[
	"\n**A friend does not come to a date with you at the agreed time. What do you do?\n**"+
	"1. Get angry.\n"+
	"2. Keep waiting.\n"+
	"3. Get furious and leave!\n",
	[
	"docile1;active2", "placid2", "active3"
	]
	]

];
Questions[4] = [
	[
	"\n**Do you like pranks?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"agitated2", "docile1;placid1"
	]
	],
	[
	"\n**Are there many things you would like to do?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"strong1;agitated2", "rude1;weird2"
	]
	],
	[
	"\n**A bully is bothering your friend. What do you do?\n**"+
	"1. I face them.\n"+
	"2. I threat them, from afar.\n"+
	"3. I throw myself at him.\n",
	[
	"audacious3", "fearful2", "agitated2"
	]
	],
	[
	"\n**Someone tends you a hand from the toilet! What do you do?\n**"+
	"1. Scream and flee.\n"+
	"2. Close the top.\n"+
	"3. Shake hands.\n",
	[
	"fearful2", "strong1;serene2", "audacious2;agitated1;reckless1"
	]
	]
];
Questions[5] = [
	[
	"\n**Would you enter an enchanted house?\n**"+
	"1. No problem!\n"+
	"2. Mmm... no.\n"+
	"3. With someone trustworthy.\n",
	[
	"audacious3", "fearful2", "rude2"
	]
	],
	[
	"\n**You receive a present! You do not know what it is. What do you do?\n**"+
	"1. Open it now!\n"+
	"2. Open it later.\n"+
	"3. Make another person open it.\n",
	[
	"active2", "serene2", "fearful2"
	]
	],
	[
	"\n**You won the lotery! What do you do with the money?\n**"+
	"1. Spend it.\n"+
	"2. Save it.\n"+
	"3. Give it to the poor.\n",
	[
	"cheerful2;active1", "strong1;serene1", "audacious2;weird2"
	]
	],
	[
	"\n**You find the treasure chest! What do you do?\n**"+
	"1. Open it!\n"+
	"2. What if it is a trap?\n"+
	"3. It must be empty...\n",
	[
	"active2", "fearful2", "rude2"
	]
	]
];
Questions[6] = [
	[
	"\n**You are in front of the President of your country. How do you talk to them?\n**"+
	"1. Nerveless.\n"+
	"2. Nervous.\n"+
	"3. WHO CARES!\n",
	[
	"strong2", "docile2", "rude2"
	]
	],
	[
	"\n**Do people say that you should think before you talk?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"agitated1;rude2", "serene2"
	]
	],
	[
	"\n**Are you comfortable with yourself? (Be sincere, ok?)\n**"+
	"1. Yes. \n"+
	"2. No.\n",
	[
	"rude2", "placid2"
	]
	],
	[
	"\n**Can you give thanks from the heart when it is necessary?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"docile2;serene1", "rude2;weird1"
	]
	]
];
Questions[7] = [
	[
	"\n**Is your dream to leave a peaceful life without many shocks?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"serene2", "agitated2"
	]
	],
	[
	"\n**Do you like fighting?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"agitated1;fearful2", "serene2;shy1"
	]
	],
	[
	"\n**Do you yawn frequently?\n**"+
	"1. Yes. \n"+
	"2. No.\n",
	[
	"serene2;placid1", "strong1;active2"
	]
	],
	[
	"\n**Do you usually arrive late to class or your dates?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"rude1;placid2", "strong2;active1"
	]
	]
];
Questions[8] = [
	[
	"\n**Today is a great and sunny day. How do you feel?\n**"+
	"1. Great!\n"+
	"2. So sleepy...\n"+
	"3. I wanna go home!\n",
	[
	"cheerful2", "placid2", "active2"
	]
	],
	[
	"\n**Do you fall asleep without noticing?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"serene1;placid2", "strong2"
	]
	],
	[
	"\n**Do you feel lonely when you are alone?\n**"+
	"1. Yes. \n"+
	"2. No.\n",
	[
	"fearful1;shy2", "rude2"
	]
	],
	[
	"\n**Does it upset you when everyone leaves before you?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"fearful1;shy2", "audacious3;placid1"
	]
	]
];
Questions[9] = [
	[
	"\n**It is the weekend and nobody wants to be with you. What do you do?\n**"+
	"1. I am going on an escapade.\n"+
	"2. I hack around.\n"+
	"3. Nobody loves me...\n",
	[
	"cheerful1;shy1", "serene1;placid2", "fearful1;shy3"
	]
	],
	[
	"\n**Do you end up with nothing to do?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"weird2", "strong2"
	]
	],
	[
	"\n**¿Do you answer an e-mail quickly?\n**"+
	"1. Instantly. \n"+
	"2. It depends.\n"+
	"3. No way.\n",
	[
	"strong1;active1", "weird2", "rude2"
	]
	],
	[
	"\n**You like someone... But it is not easy making the first step. How do you get their attention?\n**"+
	"1. I declare my love to them!\n"+
	"2. I may say hi.\n"+
	"3. I say nonsense.\n"+
	"4. I see them from afar.\n",
	[
	"strong1;audacious3", "weird2", "agitated2", "fearful2"
	]
	]
];
Questions[10] = [
	[
	"\n**You are walking down the street and see a wallet. What do you do?\n**"+
	"1. Deliver it to the police!\n"+
	"2. How difficult...\n"+
	"3. If noone sees me...\n",
	[
	"docile2", "reckless2", "agitated2"
	]
	],
	[
	"\n**You are doing bungee jumping for the first time. Since you are scared, you first throw a dummy... \nAnd the rope breaks! Do you jump anyway?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"audacious3;agitated1", "docile2;fearful1"
	]
	],
	[
	"\n**If you could choose between two presents... Which one would you choose?\n**"+
	"1. The big box.\n"+
	"2. The small box.\n",
	[
	"docile2;reckless1", "fearful2;serene1"
	]
	],
	[
	"\n**You arrive at a crossing, and you have been told there is a treasure to the right. Which way?\n**"+
	"1. Right!\n"+
	"2. Don't trust them. Left.\n"+
	"3. Any of them.",
	[
	"docile2", "rude2", "weird2"
	]
	]
];
Questions[11] = [
	[
	"\n**Imagine you have a bucket. If you had to deliver water, how much would you fill it?\n**"+
	"1. To the top.\n"+
	"2. Half.\n"+
	"3. A bit.\n",
	[
	"strong2", "serene2", "weird2"
	]
	],
	[
	"\n**Summer vacation starts! Where would you like to go?\n**"+
	"1. To the beach!\n"+
	"2. A spa.\n"+
	"3. I don't care.\n",
	[
	"cheerful2", "serene2", "weird2"
	]
	],
	[
	"\n**A tourist starts talking to you. You cannot understand anything they say. What do you say?\n**"+
	"1. Ha, ha! Hilarious!\n"+
	"2. Uhm... Excuse me?\n"+
	"3. Ahem, I have to go.\n",
	[
	"cheerful3", "strong2", "fearful2"
	]
	],
	[
	"\n**Alien invasion! What do we do?\n**"+
	"1. ¡Fight!\n"+
	"2. Flee.\n"+
	"3. Ignore them.\n",
	[
	"audacious3", "fearful2", "placid2"
	]
	]
];
Questions[12] = [
	[
	"\n**Do you like imagining things to amuse yourself?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"reckless2", "active2"
	]
	],
	[
	"\n**Have you ever laid a trap for someone?\n**"+
	"1. Yes.\n"+
	"2. No.\n",
	[
	"agitated2;shy1", "serene2"
	]
	],
	[
	"\n**Suddenly, you have been locked in a dark room! What do you do?\n**"+
	"1. Kick the door.\n"+
	"2. Ask for help.\n"+
	"3. Clean the room.\n",
	[
	"fearful2", "shy2", "agitated2;weird1"
	]
	],
	[
	"\n**With your right hand, grab a finger from your left hand. What finger did you choose?\n**"+
	"1. Thumb.\n"+
	"2. Index finger.\n"+
	"3. Middle finger.\n"+
	"4. Ring finger."+
	"5. Pinky finger.",
	[
	"fearful2", "active2", "cheerful2", "rude2", "shy2"
	]
	]
];

 /*
 * Choose Pokemon
 */
 function choosePokemon(genero, docile2, rude2, strong2, fearful2, active2, cheerful2, reckless2, serene2, agitated2, shy2, placid2, weird2, audacious2){
	let natures = {
		"docile": docile2,
		"rude": rude2,
		"strong": strong2,
		"fearful": fearful2,
		"active": active2,
		"cheerful": cheerful2,
		"reckless": reckless2,
		"serene": serene2,
		"agitated": agitated2,
		"shy": shy2,
		"placid": placid2,
		"weird": weird2,
		"audacious": audacious2
	};
	let natureSort = [];
	for(let nature in natures) {
		natureSort.push([nature, natures[nature]]);
	}
	natureSort.sort(function(a, b) {
    return a[1] - b[1];
	});

	let pokemonM = {
		"docile": [["Bulbasaur", "Grass/Poison", ["Chlorophyll", "Overgrow"]], ["Lillipup", "Normal", ["Vital Spirit", "Pickup", "Run Away"]], ["Litwick", "Ghost/Fire", ["Flash Fire", "Flame Body", "Shadow Tag", "Infiltrator"]], ["Solosis", "Psychic", ["Overcoat", "Magic Guard", "Regenerator"]]],
		"rude": [["Treecko", "Grass", ["Unburden", "Overgrow"]], ["Riolu", "Fight", ["Steadfast", "Inner Focus", "Prankster"]], ["Abra", "Psychic", ["Synchronize", "Inner Focus", "Magic Guard"]], ["Litten", "Fire", ["Intimidate", "Blaze"]]],
		"strong": [["Charmander", "Fire", ["Solar Power", "Blaze"]], ["Axew", "Dragon", ["Rivalry", "Mold Breaker", "Unnerve"]], ["Chespin", "Grass", ["Bulletproof", "Overgrow"]], ["Rowlet", "Grass/Flying", ["Long Reach", "Overgrow"]]],
		"fearful": [["Cyndaquil", "Fire", ["Flash Fire", "Blaze"]], ["Snivy", "Grass", ["Contrary", "Overgrow"]], ["Roggenrola", "Rock", ["Sturdy", "Weak Armor", "Sand Force"]], ["Popplio", "Water", ["Liquid Voice", "Torrent"]]],
		"active": [["Torchic", "Fire", ["Speed Boost", "Blaze"]], ["Turtwig", "Grass", ["Shell Armor", "Overgrow"]], ["Pidgey", "Normal/Flying", ["Keen Eye", "Tangled Feet", "Big Pecks"]], ["Munchlax", "Normal", ["Pickup", "Thick Fat", "Gluttony"]]],
		"cheerful": [["Squirtle", "Water", ["Rain Dish", "Torrent"]], ["Shinx", "Electric", ["Rivalry", "Intimidate", "Guts"]], ["Buizel", "Water", ["Swift Swim", "Water Veil"]], ["Mimikyu", "Ghost/Fairy", ["Disguise"]]],
		"reckless": [["Totodile", "Water", ["Sheer Force", "Torrent"]] , ["Skitty", "Normal", ["Cute Charm", "Normalize", "Wonder Skin"]], ["Sneasel", "Dark/Ice", ["Inner Focus", "Keen Eye", "Pickpocket"]], ["Igglybuff", "Normal/Fairy", ["Cute Charm", "Competitive", "Friend Guard"]]],
		"serene": [["Mudkip", "Water", ["Damp", "Torrent"]], ["Chikorita", "Grass", ["Leaf Guard", "Overgrow"]], ["Fennekin", "Fire", ["Magician", "Blaze"]], ["Emolga", "Electric/Flying", ["Static", "Motor Drive"]]],
		"agitated": [["Pikachu", "Electric", ["Static", "Lightning Rod"]], ["Piplup", "Water", ["Defiant", "Torrent"]], ["Eevee", "Normal", ["Run Away", "Adaptability", "Anticipation"]], ["Joltik", "Bug/Electric", ["Unnerve", "Compound Eyes", "Swarm"]]],
		"shy": [["Cubone", "Ground", ["Rock Head", "Lightning Rod", "Battle Armor"]], ["Tepig", "Fire", ["Thick Fat", "Blaze"]], ["Ralts", "Psychic", ["Synchronize", "Trace", "Telepathy"]], ["Snorunt", "Ice", ["Inner Focus", "Ice Body", "Moody"]]], 
		"placid": [["Pawniard", "Steel/Dark", ["Defiant", "Inner Focus", "Pressure"]], ["Chimchar", "Fire", ["Iron Fist", "Blaze"]], ["Sewaddle", "Grass/Bug", ["Overcoat", "Chlorophyll", "Swarm"]], ["Drifloon", "Ghost/Flying", ["Aftermath", "Unburden", "Flare Boost"]]],
		"weird": [["Meowth", "Normal", ["Pickup", "Technician", "Unnerve"]], ["Froakie", "Water", ["Protean", "Torrent"]], ["Vulpix", "Fire", ["Flash Fire", "Drought"]], ["Zubat", "Poison/Flying", ["Inner Focus", "Infiltrator"]]],
		"audacious": [["Machop", "Fight", ["Guts", "No Guard", "Steadfast"]], ["Oshawott", "Water", ["Shell Armor", "Torrent"]], ["Aron", "Rock/Steel", ["Rock Head", "Sturdy", "Heavy Metal"]], ["Gastly", "Poison/Ghost", ["Levitate"]]]
	};
	let pokemonF = {
		"docile": [["Chikorita", "Grass", ["Leaf Guard", "Overgrow"]], ["Vulpix", "Fire", ["Flash Fire", "Drought"]], ["Froakie", "Water", ["Protean", "Torrent"]], ["Gastly", "Poison/Ghost", ["Levitate"]]],
		"rude": [["Torchic", "Fire", ["Speed Boost", "Blaze"]], ["Snivy", "Grass", ["Contrary", "Overgrow"]], ["Sneasel", "Dark/Ice", ["Inner Focus", "Keen Eye", "Pickpocket"]], ["Munchlax", "Normal", ["Pickup", "Thick Fat", "Gluttony"]]],
		"strong": [["Pikachu", "Electric", ["Static", "Lightning Rod"]], ["Riolu", "Fight", ["Steadfast", "Inner Focus", "Prankster"]], ["Pidgey", "Normal/Flying", ["Keen Eye", "Tangled Feet", "Big Pecks"]], ["Igglybuff", "Normal/Fairy", ["Cute Charm", "Competitive", "Friend Guard"]]],
		"fearful": [["Mudkip", "Water", ["Damp", "Torrent"]], ["Turtwig", "Grass", ["Shell Armor", "Overgrow"]], ["Ralts", "Psychic", ["Synchronize", "Trace", "Telepathy"]], ["Joltik", "Bug/Electric", ["Unnerve", "Compound Eyes", "Swarm"]]],
		"active": [["Skitty", "Normal", ["Cute Charm", "Normalize", "Wonder Skin"]], ["Aron", "Rock/Steel", ["Rock Head", "Sturdy", "Heavy Metal"]], ["Sewaddle", "Grass/Bug", ["Overcoat", "Chlorophyll", "Swarm"]], ["Snorunt", "Ice", ["Inner Focus", "Ice Body", "Moody"]]],
		"cheerful": [["Totodile", "Water", ["Sheer Force", "Torrent"]],  ["Litwick", "Ghost/Fire", ["Flash Fire", "Flame Body", "Shadow Tag", "Infiltrator"]], ["Roggenrola", "Rock", ["Sturdy", "Weak Armor", "Sand Force"]], ["Litten", "Fire", ["Intimidate", "Blaze"]]],
		"reckless": [["Eevee", "Normal", 	["Run Away", "Adaptability", "Anticipation"]], ["Tepig", "Fire", ["Thick Fat", "Blaze"]], ["Chespin", "Grass", ["Bulletproof", "Overgrow"]], ["Popplio", "Water", ["Liquid Voice", "Torrent"]]],
		"serene": [["Bulbasaur", "Grass/Poison", ["Chlorophyll", "Overgrow"]], ["Cyndaquil", "Fire", ["Flash Fire", "Blaze"]], ["Buizel", "Water", ["Swift Swim", "Water Veil"]], ["Mimikyu", "Ghost/Fairy", ["Disguise"]]],
		"agitated": [["Cubone", "Ground", ["Rock Head", "Lightning Rod", "Battle Armor"]], ["Chimchar", "Fire", ["Iron Fist", "Blaze"]], ["Machop", "Fight", ["Guts", "No Guard", "Steadfast"]], ["Rowlet", "Grass/Flying", ["Long Reach", "Overgrow"]]],
		"shy": [["Pawniard", "Steel/Dark", ["Defiant", "Inner Focus", "Pressure"]], ["Meowth", "Normal", ["Pickup", "Technician", "Unnerve"]], ["Abra", "Psychic", ["Synchronize", "Inner Focus", "Magic Guard"]],  ["Zubat", "Poison/Flying"], ["Inner Focus", "Infiltrator"]],
		"placid": [["Squirtle", "Water", ["Rain Dish", "Torrent"]], ["Oshawott", "Water", ["Shell Armor", "Torrent"]], ["Lillipup", "Normal", ["Vital Spirit", "Pickup", "Run Away"]], ["Drifloon", "Ghost/Flying", ["Aftermath", "Unburden", "Flare Boost"]]],
		"weird": [["Treecko", "Grass", ["Unburden", "Overgrow"]], ["Piplup", "Water", ["Defiant", "Torrent"]], ["Fennekin", "Fire", ["Magician", "Blaze"]], ["Emolga", "Electric/Flying", ["Static", "Motor Drive"]]],
		"audacious": [["Charmander", "Fire", ["Solar Power", "Blaze"]], ["Axew", "Dragon", ["Rivalry", "Mold Breaker", "Unnerve"]], ["Shinx", "Electric", ["Rivalry", "Intimidate", "Guts"]], ["Solosis", "Psychic", ["Overcoat", "Magic Guard", "Regenerator"]]]
	};
	
	let movements = {
		"Normal": ["__Scratch__ (Physic) Potency:40 Precision:100 PP:35(56)", "__Tackle__ (Physic) Potency:40 Precision:100 PP:35(56)", "__Pound__ (Physic) Potency:40 Precision:100 PP:35(56)", "__Tail Whip__ (Stats) Potency:- Precision:100 PP:30(48)", "__Leer__ (Stats) Potency:- Precision:100 PP:30(48)", "__Growl__ (Stats) Potency:- Precision:100 PP:40(64)"],
		"Water": ["__Water Gun__ (Physic) Potency:40 Precision:100 PP:35(56)"],
		"Grass": ["__Vine Whip__ (Physic) Potency:45 Precision:100 PP:25(40)"],
		"Fire": ["__Ember__ (Special) Potency:40 Precision:100 PP:25(40)"],
		"Electric": ["__Thunder Wave__ (Stats) Potency:40 Precision:90 PP:20(32)"],
		"Flying": ["__Peck__ (Physic) Potency:35 Precision:100 PP:35(56)"],
		"Poison": ["__Poison Powder__ (Stats) Potency:- Precision:75 PP:35(56)"],
		"Dark": ["__Pursuit__ (Physic) Potency:40 Precision:100 PP:20(32)", "__Snatch__ (Stats) Potency:- Precision:- PP:10(16)"],
		"Ghost": ["__Night Shade__ (Special) Potency:Variable Precision:100 PP:15(24)", "__Lick__ (Physic) Potency:30 Precision:100 PP:30(48)"],
		"Psychic": ["__Confusion__ (Special) Potency:50 Precision:100 PP:25(40)"],
		"Ice": ["__Ice Shard__ (Physic) Potency:40 Precision:100 PP:30(48)", "__Aurora Veil__ (Stats) Potency:- Precision:- PP:20(32)"],
		"Rock": ["__Rock Throw__ (Physic) Potency:50 Precision:90 PP:15(24)"],
		"Steel": ["__Shift Gear__ (Stats) Potency:- Precision:- PP:10(16)"],
		"Fairy": ["__Fairy Wind__ (Special) Potency:40 Precision:100 PP:30(48)"],
		"Ground": ["__Mud-Slap__ (Special) Potency:20 Precision:100 PP:10(16)", "__Sand Tomb__ (Physic) Potency:35 Precision:85 PP:15(24)"],
		"Fight": ["__Rock Smash__ (Physic) Potency:40 Precision:100 PP:15(24)"],
		"Bug": ["__Fury Cutter__ (Physic) Potency:10 Precision:100 PP:35(56)", "__String Shot__ (Stats) Potency:- Precision:100 PP:35(56)"],
		"Dragon": ["__Twister__ (Special) Potency:40 Precision:100 PP:20(32)"]
	}
	let movementsKeys = Object.keys(movements);
	
	let result = [];
	if(genero == 0){
		let array = [];
		for(let i=0; i<natureSort.length; i++){
			let indicator;
			if(Math.floor(natureSort[i][1]/2) >= pokemonM[natureSort[i][0]].length-1){
				indicator = pokemonM[natureSort[i][0]].length-1;
			}else{
				indicator = Math.floor(natureSort[i][1]/2);
			}
			for(let j=0; j<indicator; j){
				let number = getRandomInt(0, pokemonM[natureSort[i][0]].length-1);
				if(!array.includes(pokemonM[natureSort[i][0]][number])){
					array.push(pokemonM[natureSort[i][0]][number]);
					j++;
				}
			}
		}
		console.log(array);
		let number = getRandomInt(0, array.length-1);
		result = array[number];
	}else{
		let array = [];
		for(let i=0; i<natureSort.length; i++){
			let indicator;
			if(Math.floor(natureSort[i][1]/2) >= pokemonF[natureSort[i][0]].length-1){
				indicator = pokemonF[natureSort[i][0]].length-1;
			}else{
				indicator = Math.floor(natureSort[i][1]/2);
			}
			for(let j=0; j<indicator; j){
				let number = getRandomInt(0, pokemonF[natureSort[i][0]].length-1);
				if(!array.includes(pokemonF[natureSort[i][0]][number])){
					array.push(pokemonF[natureSort[i][0]][number]);
					j++;
				}
			}
		}
		console.log(array);
		let number = getRandomInt(0, array.length-1);
		result = array[number];
	}
	let normFis = [];
	let normEst = [];
	for(let i=0; i<movements["Normal"].length; i++){
		if(movements["Normal"][i].search("Physic") != -1 || movements["Normal"][i].search("Special") != -1){
			normFis.push("**[Normal]** "+movements["Normal"][i]);
		}else if(movements["Normal"][i].search("Stats") != -1){
			normEst.push("**[Normal]** "+movements["Normal"][i]);
		}
	}
	let tipMov = [];
	for(let i=0;i<movementsKeys.length; i++){
		if(result[1].search(movementsKeys[i]) != -1){
			for(let j=0;j<movements[movementsKeys[i]].length;j++){
				tipMov.push("**["+movementsKeys[i]+"]** "+movements[movementsKeys[i]][j]);
			}
		}
	}
	let movimientos = [normFis[getRandomInt(0, normFis.length-1)], normEst[getRandomInt(0, normEst.length-1)], tipMov[getRandomInt(0, tipMov.length-1)]];
	result.push(movimientos.join("\n"));
	
	return result;
 }

 /*
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
 
 /*
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 /*
 * Return a message for async method purposes. Not currently used.
 */
async function waitForMessage(message){
	return await message;
}

 /*
 * Pokémon test.
 */
async function testEN(player, chann, bigChann){
	let notest = 0;
	let notest2 = 0;
	
	//Nature variables
	let docile = 0;
	let rude = 0;
	let strong = 0;
	let fearful = 0;
	let active = 0;
	let cheerful = 0;
	let reckless = 0;
	let serene = 0;
	let agitated = 0;
	let shy = 0;
	let placid = 0;
	let weird = 0;
	let audacious = 0;
	let genero = 0;
	
	//Test
	for(let i=0;i<Questions.length;i++){
		let number = getRandomInt(0, 2);
		await player.send(Questions[i][number][0])
		.then(
			await chann.awaitMessages(response => response.author.id == player.id, {
			  max: 1,
			  time: 60000,
			  errors: ['time'],
			})
			.then((collected) => {
				if(collected.first().author.id == player.id){
					let answer = parseInt(collected.first().content);
					answer--;
					if(answer == null || answer > Questions[i][number][1].length){
						player.send("Unknown response. Test canceled.");
						i = Questions.length;
						notest = 1;
					}else{
						//Assign points to natures
						let values = Questions[i][number][1][answer].split(";");
						for(let j=0;j<values.length;j++){
							if(values[j].search("docile") != -1){
								docile += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("cheerful") != -1){
								cheerful += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("rude") != -1){
								rude += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("reckless") != -1){
								reckless += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("strong") != -1){
								strong += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("serene") != -1){
								serene += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("fearful") != -1){
								fearful += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("agitated") != -1){
								agitated += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("active") != -1){
								active += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("shy") != -1){
									shy += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("placid") != -1){
								placid += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("weird") != -1){
								weird += parseInt(values[j].charAt(values[j].length-1));
							}else if(values[j].search("audacious") != -1){
								audacious += parseInt(values[j].charAt(values[j].length-1));
							}
						}
					}
				}
			}).catch(function(){
				notest = 1;
				player.send("Unknown response. Test canceled.");
				i = Questions.length;
			})
		).catch(function(){
			notest = 1;
			player.send("Unknown response. Test canceled.");
			i = Questions.length;
		});
	}
	
	if(notest != 1){
		await player.send("**Are you a boy or a girl?**\n"+
		"1. Boy.\n"+
		"2. Girl.\n")
		.then(
			await chann.awaitMessages(response => response.author.id == player.id, {
				max: 1,
				time: 60000,
				errors: ['time'],
			})
			.then((collected) => {
					if(collected.first().author.id == player.id){
						let answer = parseInt(collected.first().content);
						answer--;
						if(answer == null || (answer != 0 && answer != 1)){
							player.send("Unknown response. Test canceled.");
							notest2 = 1;
						}else{
							//Assign gender
							if(answer == 0){
								genero = 0;
							}else{
								genero = 1;
							}
						}
					}
				}).catch(function(){
					player.send("Unknown response. Test canceled.");
					notest2 = 1;
				})
			).catch(function(){
				player.send("Unknown response. Test canceled.");
				notest2 = 1;
			});
		
		//Choose pokemon	
		console.log("@"+player.username+"#"+player.discriminator);
		console.log(">docile =  " + docile + "\n" + 
					">rude = " + rude + "\n" + 
					">strong = " + strong + "\n" + 
					">fearful = " + fearful + "\n" + 
					">active = " + active + "\n" + 
					">cheerful = " + cheerful + "\n" + 
					">reckless = " + reckless + "\n" + 
					">serene = " + serene + "\n" + 
					">agitated = " + agitated + "\n" + 
					">shy = " + shy + "\n" + 
					">placid = " + placid + "\n" + 
					">weird = " + weird + "\n" + 
					">audacious = " + audacious);
		if(genero == 0){
			console.log(">Gender = Boy");
		}else{
			console.log(">Gender = Girl");
		}

		if(notest2 != 1){	
		setTimeout(
		function(){
			player.send("The test has finished.");
			setTimeout(
			function(){
				player.send("What pokémon will you be?...");
				setTimeout(
				function(){
					player.send("Oh my!");
					setTimeout(
					function(){
						player.send("Seems like...");
						setTimeout(
						function(){
							var pokemon = choosePokemon(genero, docile, rude, strong, fearful, active, cheerful, reckless, serene, agitated, shy, placid, weird, audacious);
							var attachment = new Discord.Attachment("./images/"+pokemon[0]+".png");
							var file = pokemon[0]+".png";
							if(genero == 0){
								player.send("You are a male **"+pokemon[0]+"**!");
							}else{
								player.send("You are a female **"+pokemon[0]+"**!");
							}
							player.send(attachment);
							setTimeout(
							async function(){
								await player.send("**Is this your appearance?** \n1. Yes.\n2. No.").then(
									await chann.awaitMessages(response => response.author.id == player.id, {
										max: 1,
										time: 60000,
										errors: ['time'],
									})
									.then((collected) => {
											if(collected.first().author.id == player.id){
												let answer = parseInt(collected.first().content);
												answer--;
												if(answer == null || (answer != 0 && answer != 1)){
													player.send("Unknown response. Test canceled.");
													return 1;
												}else{
													if(answer == 0){
														setTimeout(
															async function(){
																await player.send("**Do you want a nickname?** \n1. Yes.\n2. No.").then(
																	await chann.awaitMessages(response => response.author.id == player.id, {
																		max: 1,
																		time: 60000,
																		errors: ['time'],
																	})
																	.then((collected) => {
																			if(collected.first().author.id == player.id){
																				let answer = parseInt(collected.first().content);
																				answer--;
																				if(answer == null || (answer != 0 && answer != 1)){
																					player.send("Unknown response. Test canceled.");
																					return 1;
																				}else{
																					if(answer == 0){
																						setTimeout(
																							async function(){
																								await player.send("**Write your nickname.**").then(
																									await chann.awaitMessages(response => response.author.id == player.id, {
																										max: 1,
																										time: 60000,
																										errors: ['time'],
																									})
																									.then((collected) => {
																											if(collected.first().author.id == player.id){
																												let answer = collected.first().content;
																												console.log(answer);
																												if(answer == null){
																													player.send("Unknown response. Test canceled.");
																													return 1;
																												}else{
																													let gender;
																													if(genero == 0){
																														gender = "♂️";
																													}else{
																														gender = "♀️";
																													}
																													console.log(gender);
																													player.send("Great! Let the adventure begin!");
																													console.log(pokemon);
																													const embedmsg = new Discord.RichEmbed()
																													.setColor("RED")
																													.setAuthor(player.tag, player.displayAvatarURL)
																													.setThumbnail(player.displayAvatarURL)
																													.setTitle(answer)
																													.addField("Species", pokemon[0])
																													.addField("Gender", gender, true)
																													.addField("Type", pokemon[1], true)
																													.addField("Ability", pokemon[2][getRandomInt(0, pokemon[2].length-1)], true)
																													.addField("Moves", pokemon[3])
																													.attachFiles(["./images/"+file])
																													.setImage("attachment://"+file)
																													.setFooter('Made with Mysterious Voice', 'https://i.ytimg.com/vi/jyWq6gY7SZk/maxresdefault.jpg');
																													bigChann.send(embedmsg);
																												}
																											}
																										}).catch(function(){
																											return 1;
																										})
																								).catch(function(){
																									return 1;
																								});
																							},
																							500);
																					}else{
																						let gender;
																						if(genero == 0){
																							gender = "♂️";
																						}else{
																							gender = "♀️";
																						}
																						console.log(gender);
																						player.send("Great! Let the adventure begin!");
																						console.log(pokemon);
																						const embedmsg = new Discord.RichEmbed()
																						.setColor("RED")
																						.setAuthor(player.tag, player.displayAvatarURL)
																						.setThumbnail(player.displayAvatarURL)
																						.setTitle(pokemon[0])
																						.addField("Species", pokemon[0])
																						.addField("Gender", gender, true)
																						.addField("Type", pokemon[1], true)
																						.addField("Ability", pokemon[2][getRandomInt(0, pokemon[2].length-1)], true)
																						.addField("Moves", pokemon[3])
																						.attachFiles(["./images/"+file])
																						.setImage("attachment://"+file)
																						.setFooter('Made with Mysterious Voice', 'https://i.ytimg.com/vi/jyWq6gY7SZk/maxresdefault.jpg');
																						bigChann.send(embedmsg);
																					}
																				}
																			}
																		}).catch(function(){
																			return 1;
																		})
																).catch(function(){
																	return 1;
																});
															},
															500);
													}else{
														player.send("What a shame! Try doing the test again, and good luck!");
													}
												}
											}
										}).catch(function(){
											return 1;
										})
								).catch(function(){
									return 1;
								});
							},
							2500);
						},
						3000);
					},
					3000);
				},
				4000);
			},
			2000);
		},
		1000);
		}
	}
}

// Initialize Discord Bot
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('Mystery voice activeted.');
	bot.user.setActivity('Use \'!test\' to start your adventure!');
});

bot.on('error', console.error);
bot.on('message', async message =>{
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	let ontest = false;
    if(message.content === '!test'){
		message.react('👌');
		let player = message.author;
		let msg = await player.send("``Welcome to the world of Pokémon!``");
		setTimeout(
		function(){
			player.send("``The test will begin now. Try to answer every question sincerely. " +
			"\nOnce the question shows, please answer writing the number of the answer you want. \nWrite only when the " +
			"question appears.``");
			setTimeout(
			function(){
				let chann = msg.channel;
				player.send("``Do not feel nervous, and good luck!\n``");
				setTimeout(
				function(){
					testEN(player, chann, message.channel);
				},
				3000);
			},
			5000);
		},
		5000);
		
    };
});

bot.login(auth.token);