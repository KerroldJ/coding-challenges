import React, { useState } from 'react';

interface FormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({ username: "", password: ""});
    // const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }
    
    const validate = (): Partial<FormData> => {
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

        return newErrors;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            console.error("Validation errors:", validationErrors);
            return;
        }
    }

    return(
        <div className="p-8 rounded-lg w-full max-w-md border">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className='block text-sm font-meduim'>Username:</label>
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
                </div>
                <div>
                    <label htmlFor="password" className='block text-sm font-meduim'>Password:</label>
                    <input
                        className="w-full p-2 border rounded focus:outline-none"  
                        type="text"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        name="password"
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-20 py-2 px-4 rounded-lg focus:outline-none bg-sky-400 text-white font-bold cursor-pointer'>LogIn</button>
            </form>
        </div>
    );
};

export default LoginForm;