import type { Request, Response } from "express";

const userLogout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully",
        isError: false,
    });
};

export default userLogout;
