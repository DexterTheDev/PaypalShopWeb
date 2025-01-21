module.exports = {
    // SETUP
    token: "", // BOT TOKEN
    mongodb: "", // MONGO ATLAS CLUSTER CONNECTION LINK
    port: 3000, // HOST PORT
    clientID: "", // CLIENT ID
    clientSecret: "", // DISCORD BOT CLIENT SECRET
    domain: "http://localhost:3000",
    // CONFIG
    guildID: "", // DISCORD SERVER GUILD ID
    talkingChannel: "", // The channel will appear on the home page for discord chatting
    logs: "", // LOGS CHANNEL ID FOR WEBSITE ERRORS
    support: "https://discord.gg/", // DISCORD SERVER PERMANENT INVITE
    access: [""], // PEOPLE WHO CAN ACCESS PANEL SEPERATE BY COMMA ["ID", "ID"]
    paypal: {
        'mode': "sandbox",
        'client_id': "",
        'client_secret': ""
    },
    // TO MAKE THE LOGIN WORKS DON'T FORGET TO GO THE DEVELOPER PORTAL AFTER CREATING BOT AND ADD CALLBACK REDIRECTING IN THE "OAUTH2 PAGE" AND ADD THIS LINK "http://localhost:3000/callback" OR ADD YOUR DOMAIN BUT DON'T FORGET TO ADD /CALLBACK AT THE LAST
    // ENJOY :D
    
    // DETAILS
    name: "Product site",
    siteDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus. Massa tincidunt nunc pulvinar sapien et. Elementum facilisis leo vel fringilla. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla.",
    ex_cards: {
        card_one: {
            name: "HOLDER 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus.",
            image: "/public/imgs/cr.png"
        },
        card_two: {
            name: "HOLDER 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus.",
            image: "/public/imgs/cr.png"
        },
        card_three: {
            name: "HOLDER 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus.",
            image: "/public/imgs/cr.png"
        }
    },
    legal: {
        terms_of_service: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus.`,
        privacy_policy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Tristique senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus. Erat nam at lectus urna duis convallis convallis tellus. Donec enim diam vulputate ut pharetra sit amet aliquam. Enim lobortis scelerisque fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta. Est ante in nibh mauris cursus.`
    }
}