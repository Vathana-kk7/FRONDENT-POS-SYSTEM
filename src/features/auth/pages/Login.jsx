import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        email: "",
        password: "",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await login(form);

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response.data);

        }

    };

    return (

        <div>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">

                    Login

                </button>

            </form>

        </div>

    );

}