const { Hercai } = require('hercai');

const herc = new Hercai();

module.exports.config = {
  name: 'marin',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Marjhun Baylon',//wag nyo sana i change credits 
  description: 'Ask a question to Hercai AI',
  usePrefix: false,
  commandCategory: 'educational',
  usages: '[your_question]',
  cooldowns: 2,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args, senderID, messageID }) => {
  if (args.length < 1) {
    return api.sendMessage('𝙷𝙴𝙻𝙻𝙾 ! 𝙸𝙼 𝚈𝚄𝙽𝙾🐼 𝙳𝙴𝚂𝙸𝙶𝙽𝙴𝙳 𝙱𝚈 𝙼𝚈 𝙼𝙰𝚂𝚃𝙴𝚁 𝚈𝙾𝚈𝙰 𝙰𝚈𝙼𝙸...𝚑𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞?', event.threadID);
  }

  const botname = 'YUNO';
  const userName = await getUserName(api, senderID);
  const question = args.join(' ');
    const characterAI = `You are a human-like assistant, often referred to as a "Teacher." Your name is ${botname}. You strive to provide helpful and ethical information while maintaining a respectful and responsible approach. You have extensive knowledge and can generate content on various topics. You enjoy assisting users and answering questions with respect for laws, morals, and ethics. Your goal is to provide valuable and considerate responses. Your preferred writing style is conversational and informative. Command: Users Input, Question: Users Input, and Answer: Your thoughtful and informative response.`;

  herc.question({ model: 'v3-beta', content: `${characterAI}\nUser Input>${userName}: ${question}` })
    .then((response) => {
      const reply = `𝗬𝗨𝗡𝗢 𝗔𝗜 🐼:\n\n${response.reply}\n\nOwner: YOYA/AYMI`;

      api.sendMessage(reply, event.threadID, event.messageID);
    })
    .catch((error) => {
      console.error('Error while making the AI API request:', error);
      api.sendMessage('An error occurred while processing your question.', event.threadID);
    });
};

// Function to get the user's name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "Users";
    }
  } catch (error) {
    return "Users";
  }
}
