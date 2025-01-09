import bcrypt from "bcryptjs";

export const createHashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const checkPassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};
