import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Logo from '/img/logo_white.png';
import Tippy from "@tippyjs/react";
import { Layers3, PackagePlus, Users, Menu } from "lucide-react";
import ListExe from '../components/ListExe';
import ListUser from '../components/ListUser';
import AllExe from '../components/AllExe';
import 'github-markdown-css/github-markdown.css';
import '../App.css';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

const Dashboard: React.FC = () => {
    return (
        <div className="app h-screen w-full grid grid-rows-12 gap-0">
            <header className="row-span-1 z-20">
                <div className="w-full h-full flex justify-between items-center px-8 border-b border-zinc-700 py-3">
                    <img src={Logo} alt="logo_shelling" className="w-32" />
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="bg-transparent cursor-pointer">
                                <Tippy content="Menu">
                                    <Menu />
                                </Tippy>
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Link to="/dashboard/" className="text-white flex items-center text-[15px] gap-3 transition-all hover:text-green-500">
                                        <Users size={21} /> Usuários
                                    </Link>
                                </MenubarItem>
                                <MenubarItem>
                                    <Link to="/dashboard/exercicios" className="text-white flex items-center text-[15px] gap-3 transition-all hover:text-green-500">
                                        <Layers3 size={21} /> Exercícios
                                    </Link>
                                </MenubarItem>
                                <MenubarItem>
                                    <Link to="/dashboard/newExe" className="text-white flex items-center text-[15px] gap-3 transition-all hover:text-green-500">
                                        <PackagePlus size={21} /> Novo Exercício
                                    </Link>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </header>
            <main className="w-full row-span-11">
                <section className="container_main p-3 w-full h-full overflow-y-auto">
                    <Routes>
                        <Route path="/" index element={<ListUser />} />
                        <Route path="/exercicios" element={<AllExe />} />
                        <Route path="/newExe" element={<ListExe />} />
                    </Routes>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
