import React, { useEffect, useState } from "react";
import Logo from "/img/logo_white.png";
import Tippy from "@tippyjs/react";
import { Power, Settings2 } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import Cart from "../components/Graph";

interface IUserInfo {
  status: string;
  msg: string;
  data: {
    id: number;
    name: string;
    email: string;
    sex: string;
    pontos: number;
    resolvidos: number;
    pais: string;
    createdAt: string;
    updateAt: string;
    exercices: Exercise[];
  };
}

interface Exercise {
  name: string
}

const Profile = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const [loadData, setLoadData] = useState<boolean>(true);
  const [data, setData] = useState<IUserInfo>({
    status: "",
    msg: "",
    data: {
      id: 0,
      name: "",
      email: "",
      sex: "",
      pontos: 0,
      resolvidos: 0,
      pais: "",
      createdAt: "",
      updateAt: "",
      exercices: [],
    },
  });

  // Obtém o userId dos cookies
  useEffect(() => {
    const id = Cookies.get("id");
    setUserId(id);
  }, []);

  const brindData = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `https://shell-git-master-justino-soares-projects.vercel.app/api/each_user/${userId}`
      );
      setData(response.data);
      setLoadData(false);
    } catch (error) {
      console.error("Erro: ", error);
      setLoadData(false);
    }
  };

  useEffect(() => {
    if (userId) {
      brindData();
    }
  }, [userId]); // O useEffect só será executado quando o userId mudar

  return (
    <>
      <header className="flex px-5 items-center justify-between m-auto max-w-7xl w-full py-3 border-b border-zinc-700">
        <div>
          <img src={Logo} alt="logo_image" className="w-32" />
        </div>
        <div className="flex items-center gap-7">
          <Tippy content="Editar Perfil">
            <button className="text-green-400 transition-all hover:text-green-500">
              <Settings2 size={20} />
            </button>
          </Tippy>
          <Tippy content="Terminar Sessão">
            <button className="text-white transition-all hover:text-red-500">
              <Power size={20} />
            </button>
          </Tippy>
        </div>
      </header>

      <main>
        <div className="m-auto max-w-6xl w-full">
          <header className="text-center pt-20">
            <h1 className="text-white bg-gradient-to-r from-white to-black mainTittle text-6xl font-semibold">
              {data.data.name}
            </h1>
            <p className="text-white pt-2">{data.data.email}</p>
          </header>
          <div className="w-full mt-20 grid grid-cols-7 gap-5">
            
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
