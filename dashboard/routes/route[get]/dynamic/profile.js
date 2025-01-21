const USERS = require("../../../../models/users");

const index = async (fastify, options, done) => {
    fastify.get("/profile", async (req, res) => {
        if (!(await req.user)) return fastify.notFound(req, res);
        else {
            let user = await USERS.findOne({ id: (await req.user).id })
            if (!user) user = await new USERS({ id: (await req.user).id }).save();
            let avatar = await req.client.users.fetch((await req.user).id).catch(() => { })
            req.render("/dynamic/profile.liquid", { userdb: user, avatar: avatar.displayAvatarURL({ dynamic: true }) })
            return res
        }
    });
    done();
};

module.exports = index;