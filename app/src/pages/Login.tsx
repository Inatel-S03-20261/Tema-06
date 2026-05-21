import { Eye, EyeClosed, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_USER = { username: "admin", password: "admin" };

const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 tracking-widest">
                                TRAINER ID
                            </label>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3 text-gray-500">
                                <User size={16} />
                                <input
                                    type="text"
                                    placeholder="Seu usuário"
                                    className="bg-transparent text-sm placeholder-gray-400 outline-none w-full"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError("");
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 tracking-widest">
                                SENHA
                            </label>
                            <div className="flex items-center gap-2 bg-gray-100 text-gray-500 rounded-lg px-4 py-3">
                                <LockKeyhole size={16} />
                                <input
                                    type={seePassword ? "text" : "password"}
                                    placeholder="Sua senha"
                                    className="bg-transparent text-sm placeholder-gray-400 outline-none w-full"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                />
                                {seePassword ? (
                                    <Eye
                                        size={16}
                                        className="cursor-pointer"
                                        onClick={() => setSeePassword(false)}
                                    />
                                ) : (
                                    <EyeClosed
                                        size={16}
                                        className="cursor-pointer"
                                        onClick={() => setSeePassword(true)}
                                    />
                                )}
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 accent-red-500 cursor-pointer"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600 cursor-pointer"
                            >
                                Lembre-me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="font-orbitron font-bold w-full bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white tracking-[0.2em] py-3 rounded-full mt-2 cursor-pointer"
                        >
                            ENTRAR
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
