import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Register() {

    const { register } = useAuth();

    const [form, setForm] = useState({

        name: "",
        email: "",
        password: "",
        password_confirmation: "",

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

            await register(form);

            alert("Register Success");

        } catch (error) {

            console.log(error.response.data);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

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

            <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                onChange={handleChange}
            />

            <button type="submit">

                Register

            </button>

        </form>

    );

}