import React, { useEffect, useRef, useState } from "react";
import Logo from "/img/logo_white.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import Cookies from 'js-cookie';

interface IInputGroup {
    typeData: "text" | "email" | "password";
    nameData: string;
    id: string;
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    labelText: string;
    place: string;
}

const InputGroup: React.FC<IInputGroup> = ({
    typeData,
    nameData,
    id,
    labelText,
    place,
    func,
}) => {
    const InputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={id} className="text-zinc-400 text-[15px]">
                {labelText}
            </label>
            <input
                ref={InputRef}
                type={typeData}
                name={nameData}
                id={id}
                onChange={func}
                className={`py-2.5 px-4 bg-[#2c2c2c] transition-all focus:border-green-500
                    rounded-lg border border-zinc-700 text-white outline-none`}
                placeholder={place}
            />
        </div>
    );
};

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('show_message')) {
            toast.success("Usuário Criado com Sucesso");
            Cookies.remove('show_message');
        }
    }, [])

    const sendData = async (data: Object) => {
        setLoadingData(true);
        const url = "https://shell-git-master-justino-soares-projects.vercel.app/api/login";

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            Cookies.set('token', response.data.token, { expires: 7 });
            Cookies.set('id', response.data.userId, { expires: 7 });
            Cookies.set('username', response.data.username, { expires: 7 });
            const info = {
                stat: 'Sua Conta foi criada com sucesso!',
            };
            navigate(`/${encodeURIComponent(JSON.stringify(info))}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg || "Erro desconhecido");
            } else {
                console.error('Erro:', error);
            }
        } finally {
            setLoadingData(false);
        }
    };

    const SendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.pass.value,
        };
        await sendData(data);
    };

    const ChangeTypeInput = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <main className="w-full paisagem-tablet:h-screen flex justify-center items-center">
            <form
                method="POST"
                onSubmit={SendData}
                className="bg-gradient-to-b relative paisagem-tablet:mt-0 retrato-tablet:mt-10 max-w-xl w-full from-[#2c2c2c] to-transparent p-5 retrato-tablet:rounded-3xl shadow-3xl"
            >
                <header className="text-center">
                    <Toaster position="top-center" />
                    <a href="/">
                        <img src={Logo} alt="logo_image" className="w-28 m-auto" />
                    </a>
                    <small className="text-zinc-200">Bem-vindo de Volta</small>
                </header>
                <div className="grid items-center grid-cols-1 mt-10 gap-y-3">
                    <InputGroup
                        labelText="Email"
                        typeData="text"
                        id="email"
                        nameData="email"
                        place="ex@gmail.com"
                    />
                    <InputGroup
                        labelText="Password"
                        typeData={showPassword ? "text" : "password"}
                        id="pass"
                        nameData="pass"
                        place="Palavra-chave"
                    />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="see_pass" onChange={ChangeTypeInput} />
                        <label htmlFor="see_pass" className="text-white cursor-pointer">
                            Mostrar Palavra-chave
                        </label>
                    </div>
                    <div className="flex justify-between mt-3">
                        <Link to="/" className="px-6 transition-all hover:bg-zinc-800 hover:ring-4 hover:ring-zinc-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-zinc-900 rounded-full">
                            Voltar
                        </Link>
                        <button
                            type="submit"
                            className={`px-6 transition-all font-medium py-2.5 text-white bg-green-600 rounded-full hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25`}
                            disabled={loadingData}
                        >
                            {loadingData ? (
                                <span className="loader2"></span>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </div>
                    <div className="text-center pt-5">
                        <Link to="/register" className="text-white transition-all hover:text-zinc-400">
                            Não tem uma conta? <span className="text-green-500">Registre-se</span>
                        </Link>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default Register;
