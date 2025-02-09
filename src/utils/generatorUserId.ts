import User from "../model/user.js";

const generateUserId = async (email: string) => {
    const baseUsername = email.split("@")[0].toLowerCase();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const username = `${baseUsername}${randomNumber}`;

    const isUnique = await User.findOne({ username });
    if (isUnique) {
        return generateUserId(email);
    }

    return username;
};

export default generateUserId;
