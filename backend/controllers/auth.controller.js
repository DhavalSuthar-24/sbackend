import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    // Retrieve user from the database by email
    const user = await User.findOne({ where: { email } });
    console.log(
      'user',
      user
    )

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the provided password matches the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    // Omit password from user object
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    // Respond with success message, token, and user details (except password)
    res.status(200).json({ message: 'Sign in successful', token, user: userWithoutPassword });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
