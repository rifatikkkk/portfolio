import { Request, Response } from "express";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

const { FIREBASE_USER, FIREBASE_PASS } = process.env;

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "You need input fields!" });
    return;
  }

  try {
    if (email == FIREBASE_USER && password == FIREBASE_PASS) {
      // ? create a new idea
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await credentials.user.getIdToken();
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: "Incorrect data!" });
      return;
    }
  } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
