import Tippy from "@tippyjs/react";
import { FlagTriangleRight, Search, Trash2, UserRoundPen } from "lucide-react";

interface ICardEelement {
    name: string;
    email: string;
    points: number;
}

const findInitial = (fullName: string) => {
    return fullName.slice(0, 2)
}

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
    return (
        <div className="max-w-[90%] gap-5 grid retrato-tablet:grid-cols-2 grid-cols-1 paisagem-tablet:grid-cols-4 w-full m-auto">
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
            <CardElement name="Mário Salembe" email="linomario199010@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
            <CardElement name="Luísa Santos" email="luisaantos@gmail.com" points={4001} />
        </div>
    );
}

export default ListUser;
