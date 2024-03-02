const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {APP_SECRET, getUserId} = require("../utils");

const signup = async (parent, args, context, info) => {

    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
        data: {...args, password}
    });

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user
    }
}

const login = async (parent, args, context, info) => {

    const user = await context.prisma.user.findUnique({where: {email: args.email}});

    if (!user) throw new Error(`User with email ${args.email} not found!`);

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user
    }

}

const post = (parent, args, context, info) => {

    const {userId} = context;

    const link = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: {connect: {id: userId.userId}}
        }
    });

    context.pubsub.publish("NEW_LINK", link);

    return link;
}

module.exports = {
    login,
    signup,
    post
}