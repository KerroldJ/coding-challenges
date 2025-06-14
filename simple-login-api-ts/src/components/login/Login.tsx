import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../server/config';

interface FormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Inline validation logic here
        const newErrors: Partial<FormData> = {};
        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters long";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(`${SERVER_URL}/api/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Login successful:", response.data);
            // Handle successful login (e.g., redirect, store token, etc.)

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Login failed. Please check your credentials.";
                console.error("Axios error:", message);
                setErrors({ username: message });
            } else {
                console.error("Unexpected error:", error);
                setErrors({ username: "An unexpected error occurred." });
            }
        }
    };

    return (
        <div className="p-8 rounded-lg w-full max-w-md border">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className='block text-sm font-medium'>Username:</label>
                    <input
                        className="w-full p-2 border rounded focus:outline-none"
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        name="username"
                        placeholder='Username'
                        required
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="password" className='block text-sm font-medium'>Password:</label>
                    <input
                        className="w-full p-2 border rounded focus:outline-none"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        name="password"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button
                    type='submit'
                    className='w-20 py-2 px-4 rounded-lg focus:outline-none bg-sky-400 text-white font-bold cursor-pointer'>
                    LogIn
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
