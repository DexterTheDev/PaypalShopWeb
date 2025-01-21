const { MessageEmbed } = require("discord.js");
const { port } = require("../config");
const fastify = require('fastify')({ logger: false });
const { Liquid } = require("liquidjs");
const path = require("path");

module.exports = async (client) => {

    fastify.register(require('@fastify/formbody'))

    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'public'),
        prefix: '/public/'
    });

    const engine = new Liquid({
        root: path.join(__dirname, "components"),
        extname: ".liquid",
    });

    fastify.register(require("@fastify/view"), {
        engine: {
            liquid: engine,
        },
    });

    fastify.register(require('@fastify/secure-session'), {
        cookieName: 'connect.sid',
        secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
        cookie: {
            path: '/',
            maxAge: 86400000000
        },
        saveUninitialized: false
    });

    fastify.addHook('preHandler', (req, res, done) => {
        req.user = getUser(req.session.get('token_type'), req.session.get('access_token'));
        req.client = client;
        req.render = async (file, data = {}, status) => {
            req.session.set("callback", req.url);
            const baseData = {
                client,
                admin: (await req.user)?.admin ?? false,
                user: await req.user ? await client.users.fetch((await req.user).id).catch(() => { }) : null,
            };
            await res.view(`/dashboard/components/${file}`, Object.assign(baseData, data)).code(status || 200)
        }
        done()
    });

    fastify.setErrorHandler(async (error, request, reply) => {
        client.channels.cache.get(client.config.logs).send({
            embeds: [new MessageEmbed()
                .setTitle(`Visitor: ${await request.user ? (await request.user).username : "Anonymous"}`)
                .setDescription(`\`\`\`diff\n+ ERROR ${reply.statusCode}\`\`\`\`\`\`js\n${error}\`\`\``)
                .setTimestamp()
                .setColor("RED")
                .setFooter({ text: `Automatically sent error from the site - "${request?.url ?? ""}"` })
            ]
        })
    });

    fastify.decorate('notFound', (request, reply) => {
        return request.render("./handlers/error.liquid", { status: 404 }, 404);
    });
    fastify.setNotFoundHandler(fastify.notFound);

    require("./routes.json").map(async route => {
        await fastify.register(require(route));
    })

    await fastify.listen({ port }, () => console.log("site is up"));
};
const getUser = async (type, access) => {
    if (type && access) {
        const userData = require("axios").get('https://discord.com/api/users/@me', {
            responseType: 'json',
            headers: {
                authorization: `${type} ${access}`
            }
        }).catch(() => { });

        return Object.assign((await userData)?.data ?? {}, { admin: require("../config").access.includes(await ((await userData)?.data ?? {}).id) ? true : false });
    }
};

