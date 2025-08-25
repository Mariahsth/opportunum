import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'senhasecreta';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roles, teams } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles: roles || ['assistant'],  
      teams: teams || []
    });

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        roles: user.roles,
        teams: user.teams
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // só HTTPS em produção
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });

    res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};