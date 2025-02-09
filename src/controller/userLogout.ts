import type { Request, Response } from "express";

const userLogout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully", isError: false });
};

export default userLogout;
