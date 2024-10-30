import Tippy from "@tippyjs/react";
import axios from "axios";
import { FlagTriangleRight, Search, Trash2, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICardEelement {
    name: string;
    email: string;
    points: number;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    pais: string[];
    pontos: number;
    resultado: number;
}


interface UserProps {
    user: IUser;
    findInitial: (str: string) => string;
}


interface IUserInfo extends IUser { }


const findInitial = (fullName: string) => {
    return fullName.slice(0, 2)
}

const UserComponent: React.FC<UserProps> = ({ user, findInitial }) => {
    if (!user) return null;

    const { name, email, pais, pontos, resultado } = user;

    return (
        <div className="p-7 bg-gradient-to-br from-[#080808] rounded-xl shadow-xl to-transparent">
            <header className="flex items-center justify-between gap-5">
                <div>
                    <div className="w-10 flex items-center text-xl justify-center text-white font-medium ring-4 ring-green-500 ring-opacity-50 h-10 bg-green-500 rounded-full">
                        {findInitial(name)}
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        <h1 className="text-white leading-none text-2xl font-medium">{name}</h1>
                        <small className="text-zinc-400">{email}</small>
                    </div>
                    <div className="paisagem-tablet:pt-0 pt-4">
                        <p className="px-4 text-white py-1.5 rounded-full bg-[#0f0f0fc4] inline-flex text-[14px]">{pais[0]} {pais[1]}</p>
                    </div>
                </div>
            </header>
            <div className="pt-4 border-t mt-6 border-zinc-800">
                <div className="progress  h-2 bg-[#2c2c2c] rounded-full mt-2 overflow-hidden">
                    <div className="bg-green-500 w-[20%] h-full rounded-full"></div>
                </div>
                <small className="text-white">{resultado} Exercícios Resolvidos</small>
            </div>
            <footer className="w-full mt-5 flex justify-between items-center">
                <h2 className="text-white">{pontos} <span className="text-green-500">Pontos</span></h2>
                <Tippy content="Deletar">
                    <button className="px-4 transition-all font-medium py-1.5 text-white hover:opacity-40">
                        <Trash2 />
                    </button>
                </Tippy>
            </footer>
        </div>
    );
};

const CardElement: React.FC<ICardEelement> = ({ name, email, points }) => {
    return (
        <div className="p-5 shadow-2xl bg-gradient-to-br rounded-xl border border-zinc-800 from-[#111111] to-transparent">
            <header className="flex items-start gap-4">
                <div>
                    <div
                        className="w-12 h-12 bg-zinc-900 border border-zinc-600 rounded-full text-white flex items-center justify-center"
                    >
                        <p className="text-white text-xl font-medium">{findInitial(name)}</p>
                    </div>
                </div>
                <div>
                    <h1 className="text-[17px] leading-none font-medium text-white">{name}</h1>
                    <small className="text-zinc-300">{email}</small>
                </div>
            </header>
            <div className="mt-8 flex items-center justify-between">
                <p className="text-[13px]  text-[#242424] font-medium px-3 rounded-full mt-2 py-1 bg-green-400 inline-block">Angola</p>
                <p className="flex items-center text-white">
                    {points}
                    <FlagTriangleRight />
                </p>
            </div>
            <footer className="mt-3 pt-5 border-t border-zinc-700 w-full flex items-center justify-between">
                <Tippy content="Editar">
                    <button className="text-white transition-all hover:text-green-500">
                        <UserRoundPen />
                    </button>
                </Tippy>
                <Tippy content="Deletar">
                    <button className="text-white transition-all hover:text-red-500">
                        <Trash2 />
                    </button>
                </Tippy>
            </footer>
        </div>
    )
}

const ListUser = () => {
    const [data, setData] = useState<IUserInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();

    const fetchData = async () => {
        const url = 'https://shell-git-master-justino-soares-projects.vercel.app/api/show_users?limitMax=20'
        try {
            const response = await axios.get(url)
            setData(response.data.data)
            data.forEach(element => {
                console.log(element)
            });
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch data:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (


        <div className="max-w-[90%] gap-5 grid retrato-tablet:grid-cols-2 grid-cols-1 paisagem-tablet:grid-cols-4 w-full m-auto">
            {loading ? (
                <div className="text-white absolute top-0 right-0 w-full h-full bg-[#242424] flex items-center justify-center z-30">
                    <span className="loader"></span>
                </div>
            ) : (
                <>
                    <header className="col-span-full ">
                        <div className="flex  mt-6 mb-8 transition-all focus-within:border-green-500 w-full items-center border border-zinc-700 gap-3 px-4 bg-[#2c2c2c] rounded-lg">
                            <Search size={20} className="text-zinc-500" />
                            <input
                                type="text"
                                name="text"
                                id="text"
                                className="outline-none w-full text-white bg-transparent py-3"
                                placeholder="Busque por um nome..."
                            />
                        </div>
                    </header>
                    <div className="w-full col-span-full mt-12 grid paisagem-tablet:grid-cols-4 retrato-tablet:grid-cols-2 grid-cols-1 gap-5">
                        {data.map(element => (
                            <UserComponent key={element.id} user={element} findInitial={findInitial} />
                        ))}
                    </div></>
            )}
        </div>
    );
}

export default ListUser;
