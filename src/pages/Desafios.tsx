import Tippy from "@tippyjs/react";
import {
  ChartNoAxesCombined,
  Circle,
  CircleCheckBig,
  Layers3,
  Lock,
  Menu,
  Search,
  SquareStack,
  UserPlus,
} from "lucide-react";
import Logo from "/img/logo_white.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Each from "../components/Each";

interface ICardExerc {
  title: string;
  numberRes: number;
  dateRes: string;
  color: "yellow" | "green" | "red";
  level: "Coelho" | "Tigre" | "Leão";
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CardExerc: React.FC<ICardExerc> = ({
  title,
  numberRes,
  dateRes,
  level,
  color,
  onClick,
}) => {
  const colorClasses = {
    yellow: {
      ring: "ring-yellow-100",
      text: "text-yellow-500",
      bg: "bg-yellow-300",
    },
    green: {
      ring: "ring-green-100",
      text: "text-green-500",
      bg: "bg-green-300",
    },
    red: { ring: "ring-red-100", text: "text-red-500", bg: "bg-red-300" },
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex retrato-tablet:flex-row w-full retrato-tablet:gap-0 gap-6 flex-col px-3 items-start retrato-tablet:items-center justify-between">
        <div className="w-full">
          <div className="flex items-start gap-2">
            <Circle size={19} className="fill-transparent stroke-zinc-600" />
            <h1 className="text-white leading-none">{title}</h1>
          </div>
          <div className="ps-7">
            <small className="text-zinc-400">
              {numberRes} Pessoa(s) resolveram
            </small>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p
            className={`text-[14px] px-6 font-medium ring-4 ${colorClasses[color].ring} ring-opacity-15 py-1.5 ${colorClasses[color].text} bg-opacity-20 rounded-full ${colorClasses[color].bg}`}
          >
            {level}
          </p>
          <Tippy content="Exercício não resolvido">
            <p>
              <Lock size={19} className="text-white" />
            </p>
          </Tippy>
          <p className="text-zinc-400 text-center">{dateRes}</p>
        </div>
      </div>
    </div>
  );
};

function Navbar() {
  return (
    <div className="navbar bg-[#242424] fixed top-0 left-0 right-0 border-b border-zinc-700 flex paisagem-tablet:px-8 px-4 py-4 w-full justify-between paisagem-tablet:justify-around items-center">
      <div>
        <img src={Logo} alt="logo_image" className="w-32" />
      </div>
      <nav className="paisagem-tablet:inline-flex hidden">
        <ul className="flex items-center gap-12">
          <li>
            <Link
              to="/"
              className="text-zinc-300 font-medium transition-all hover:text-white"
            >
              Início
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-zinc-300 font-medium transition-all hover:text-white"
            >
              Rank
            </a>
          </li>
          <li>
            <Tippy content="Cadastre-se">
              <a
                href="#"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                <UserPlus size={21} />
              </a>
            </Tippy>
          </li>
          <li>
            <a
              href="#"
              className="px-6 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full"
            >
              Entrar
            </a>
          </li>
        </ul>
      </nav>
      <div className="paisagem-tablet:hidden inline-flex">
        <Tippy content="Menu">
          <button className="text-white transition-all hover:text-green-500">
            <Menu />
          </button>
        </Tippy>
      </div>
    </div>
  );
}

export default function Desafios() {
  const [showEach, setShowEach] = useState(false);

  const toggleEach = () => {
    setShowEach((prev) => !prev);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="paisagem-tablet:mt-44 mt-24 w-full p-5">
        <div className="max-w-[85rem] w-full m-auto">
          <header className="flex gap-5 paisagem-tablet:flex-row flex-col justify-between items-center">
            <Tippy content="Número de Exercícios">
              <div className="flex gap-3 items-center">
                <Layers3 className="text-green-500" />
                <p className="font-medium cursor-default text-white">344</p>
              </div>
            </Tippy>
            <div className="flex paisagem-tablet:flex-row flex-col justify-between items-center  max-w-3xl gap-4 w-full">
              <div className="flex paisagem-tablet:max-w-[28rem] transition-all focus-within:border-zinc-500 w-full items-center border border-zinc-700 gap-3 px-4 bg-[#2c2c2c] rounded-lg">
                <SquareStack size={20} className="text-green-500" />
                <select
                  name="categoria"
                  className="outline-none w-full text-white bg-[#2c2c2c] py-3"
                  defaultValue="all"
                  id="catgoria"
                >
                  <option value="all">Todas</option>
                  <option value="leão">Leão</option>
                </select>
              </div>
              <div className="flex paisagem-tablet:max-w-2xl transition-all focus-within:border-zinc-500 w-full items-center border border-zinc-700 gap-3 px-4 bg-[#2c2c2c] rounded-lg">
                <Search size={20} className="text-zinc-500" />
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="outline-none w-full text-white bg-transparent py-3"
                  placeholder="Busque por um nome..."
                />
              </div>
            </div>
          </header>

          <div className="mt-20 shadow-2xl gap-8 w-full grid grid-cols-1 px-5 py-8 bg-gradient-to-b from-[#2c2c2c] to-transparent rounded-3xl">
            <header className="flex border-b pb-3 border-zinc-700 items-center px-3 justify-between">
              <Tippy content="Exercícios Resolvidos">
                <div className="flex items-center gap-3">
                  <CircleCheckBig size={20} className="text-green-500" />
                  <p className="text-white cursor-default font-medium">45</p>
                </div>
              </Tippy>
              <Tippy content="Exercícios Resolvidos">
                <div className="flex items-center gap-3">
                  <ChartNoAxesCombined size={20} className="text-green-500" />
                  <p className="text-white cursor-default font-medium">15 %</p>
                </div>
              </Tippy>
            </header>
            {[
              {
                dateRes: "10/2023",
                color: "green",
                level: "Tigre",
                numberRes: 14,
                title: "Saltando entre pontos",
              },
              {
                dateRes: "10/2023",
                color: "red",
                level: "Leão",
                numberRes: 34,
                title: "Dividindo pelo separador",
              },
            ].map((exercise, index) => (
              <CardExerc key={index} {...exercise} onClick={toggleEach} />
            ))}
          </div>
        </div>
        <Each value={showEach} setValue={setShowEach} />
      </main>
    </>
  );
}
