import express from 'express';
import { dummyUsers } from '../../data/users.js';
import { studentMembers } from '../../data/members.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = dummyUsers.find(
        user => user.username === username && user.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.json({
        message: 'Login successful',
        user: { username: user.username }
    });
});

router.get('/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: dummyUsers,
    });
});

router.get('/members', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Student members retrieved successfully',
        data: studentMembers,
    });
});

export default router;
