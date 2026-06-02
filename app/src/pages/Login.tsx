import type { FormEvent } from "react";
import { useState } from "react";
import { Eye, EyeClosed, LockKeyhole, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CheckboxInput from "../components/forms/CheckboxInput";
import TextInput from "../components/forms/TextInput";
import Button from "../components/ui/Button";

const MOCK_USER = { username: "admin", password: "admin" };

const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Informe o Trainer ID e a senha.");
            return;
        }

        if (
            username === MOCK_USER.username &&
            password === MOCK_USER.password
        ) {
            navigate("/");
        } else {
            setError("Trainer ID ou senha inválidos.");
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden m-4">
                <div className="relative bg-red-500 h-24 w-full flex items-end justify-center">
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black z-10" />
                    <div className="relative z-20 -mb-5.5 w-11 h-11 rounded-full bg-white border-[5px] border-black flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-indigo-500" />
                    </div>
                </div>

                <div className="px-10 pt-12 pb-10 flex flex-col items-center">
                    <h1 className="font-orbitron font-semibold text-red-500 tracking-[0.25em] text-xl mb-1">
                        POKÉDEX
                    </h1>
                    <p className="text-gray-800 font-bold text-lg mb-8">
                        Painel de Administração
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-5"
                    >
                        <TextInput
                            label="TRAINER ID"
                            type="text"
                            placeholder="Seu usuário"
                            value={username}
                            icon={<User size={16} />}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setError("");
                            }}
                        />

                        <TextInput
                            label="SENHA"
                            type={seePassword ? "text" : "password"}
                            placeholder="Sua senha"
                            value={password}
                            icon={<LockKeyhole size={16} />}
                            error={error}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            action={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    aria-label={
                                        seePassword
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                    className="h-6 w-6 p-0"
                                    onClick={() =>
                                        setSeePassword(
                                            (currentValue) => !currentValue,
                                        )
                                    }
                                >
                                    {seePassword ? (
                                        <Eye size={16} />
                                    ) : (
                                        <EyeClosed size={16} />
                                    )}
                                </Button>
                            }
                        />

                        <CheckboxInput id="remember" label="Lembre-me" />

                        <Button
                            type="submit"
                            className="mt-2 w-full rounded-full py-3 font-orbitron tracking-[0.2em] active:scale-95"
                        >
                            ENTRAR
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
