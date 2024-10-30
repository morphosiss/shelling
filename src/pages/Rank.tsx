import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Logo from "/img/logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { Menu, Search, UserPlus } from "lucide-react";
import axios from "axios";
import getUserPermissions from "@/components/JWT";

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

interface IUserInfo extends IUser {}

function Navbar() {
  function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const findInitial = (str: string | undefined) => {
    return str ? capitalize(str.slice(0, 2)) : "";
  };

  const [token, setToken] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("token"));
    setUserName(Cookies.get("username"));
    setUserId(Cookies.get("id"));
  }, []);

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
            <Link
              to="/desafios"
              className="text-zinc-300 font-medium transition-all hover:text-white"
            >
              Desafios
            </Link>
          </li>
          {token ? (
            <Link to={`/profile/${userId}`}>
              <div className="w-10 flex items-center justify-center text-white font-medium ring-4 ring-green-500 ring-opacity-50 h-10 bg-green-500 rounded-full">
                {findInitial(userName)}
              </div>
            </Link>
          ) : (
            <>
              <li>
                <Tippy content="Cadastre-se">
                  <Link
                    to="/register"
                    className="text-zinc-300 font-medium transition-all hover:text-white"
                  >
                    <UserPlus size={21} />
                  </Link>
                </Tippy>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-6 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full"
                >
                  Entrar
                </Link>
              </li>
            </>
          )}
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
            <h1 className="text-white leading-none text-2xl font-medium">
              {name}
            </h1>
            <small className="text-zinc-400">{email}</small>
          </div>
          <div className="paisagem-tablet:pt-0 pt-4">
            <p className="px-4 text-white py-1.5 rounded-full bg-[#0f0f0fc4] inline-flex text-[14px]">
              {pais[0]} {pais[1]}
            </p>
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
        <h2 className="text-white">
          {pontos} <span className="text-green-500">Pontos</span>
        </h2>
        <button className="px-4 transition-all font-medium py-1.5 text-white bg-green-600 rounded-full hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25">
          Perfil
        </button>
      </footer>
    </div>
  );
};

const Rank = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const findInitial = (str: string | undefined) => {
    return str ? capitalize(str.slice(0, 2)) : "";
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("token");
      const checkToken = await getUserPermissions(token || "");
      if (checkToken?.status === false) {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const fetchData = async () => {
    const url =
      "https://shell-git-master-justino-soares-projects.vercel.app/api/show_users?limitMax=20";
    try {
      const response = await axios.get(url);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {loading ? (
          <div className="text-white absolute top-0 right-0 w-full h-full bg-[#242424] flex items-center justify-center z-30">
            <span className="loader"></span>
          </div>
        ) : (
          <section className="unlogged_user mt-36 max-w-[90%] w-full m-auto">
            <header>
              <div className="flex m-auto paisagem-tablet:max-w-4xl transition-all focus-within:border-zinc-500 w-full items-center border border-zinc-700 gap-3 px-4 bg-[#2c2c2c] rounded-lg">
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

            <div className="w-full mt-16 grid paisagem-tablet:grid-cols-4 retrato-tablet:grid-cols-2 grid-cols-1 gap-5">
              {data.map((element) => (
                <UserComponent
                  key={element.id}
                  user={element}
                  findInitial={findInitial}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Rank;
