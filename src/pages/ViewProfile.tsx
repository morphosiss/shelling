import React, { useEffect, useState } from "react";
import Logo from "/img/logo_white.png";
import Morphosis from "/img/logo.png";
import Tippy from "@tippyjs/react";
import { Activity, CircleCheckBig, Edit, Route, Settings2 } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import getUserPermissions from "@/components/JWT";

interface IUserInfo {
  status: string;
  msg: string;
  data: {
    id: number;
    name: string;
    email: string;
    pontos: number;
    resolvidos: number;
    country: string[];
    createdAt: string;
    updateAt: string;
    exercices: Exercise[];
  };
}

interface Exercise {
  name: string;
}

interface IProgress {
  progress: number;
  day: "Seg" | "Ter" | "Qua" | "Qui" | "Sex" | "Sáb" | "Dom";
}

const ProgressComponent: React.FC<IProgress> = ({ progress, day }) => {
  return (
    <div className="flex flex-col w-full h-full justify-end items-center gap-3">
      <Tippy content={`${progress}%`}>
        <div
          className="rounded-t-md bg-gradient-to-b cursor-pointer from-green-500 to-transparent w-12"
          style={{ height: `${progress}%` }}
        ></div>
      </Tippy>
      <p className="text-zinc-400">{day}</p>
    </div>
  );
};

const ItemStatus: React.FC<{ camp: string; value: string }> = ({
  camp,
  value,
}) => {
  return (
    <div className="flex items-center justify-between mt-5">
      <div>
        <p className="text-zinc-400">{camp}</p>
      </div>
      <div>
        <h2 className="text-white font-medium">{value}</h2>
      </div>
    </div>
  );
};

const SimpleFooter = () => {
  return (
    <footer className="w-full p-5 bg-gradient-to-b from-transparent to-[#2c2c2c]">
      <div className="flex retrato-tablet:flex-row flex-col  mt-16 max-w-7xl w-full m-auto items-center justify-center gap-5 retrato-tablet:justify-between ">
        <div>
          <img src={Logo} alt="logo_image" className="w-28" />
        </div>
        <div>
          <img src={Morphosis} alt="logo_image" className="w-28" />
        </div>
      </div>
    </footer>
  );
};

const ViewProfile = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const [loadData, setLoadData] = useState<boolean>(true);
  const navigate = useNavigate();
  const [data, setData] = useState<IUserInfo>({
    status: "",
    msg: "",
    data: {
      id: 0,
      name: "",
      email: "",
      pontos: 0,
      resolvidos: 0,
      country: [],
      createdAt: "",
      updateAt: "",
      exercices: [],
    },
  });
  const [visitant, setVisitant] = useState<string | undefined>("");

  useEffect(() => {
    //const { idVisitant } = useParams();
    //setVisitant(idVisitant);
    const id = Cookies.get("id");
    console.log(id);
    setUserId(id);
  }, []);

  const bringData = async () => {
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
    const checkLoginStatus = async () => {
      const token = Cookies.get("token");
      const checkToken = await getUserPermissions(token || "");
      if (checkToken?.status === false) {
        navigate("/login");
      }
    };
    checkLoginStatus();
    if (userId) {
      bringData();
    }
  }, [userId]);

  function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const findInitial = (str: string | undefined) => {
    return str ? capitalize(str.slice(0, 2)) : "";
  };

  const Logout = () => {
    Cookies.remove("id");
    Cookies.remove("token");
    navigate("/");
  };

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
        </div>
      </header>
      {loadData ? (
        <div className="text-white absolute top-0 right-0 w-full h-full bg-[#242424] flex items-center justify-center z-30">
          <span className="loader"></span>
        </div>
      ) : (
        <main>
          <div className="m-auto max-w-6xl w-full">
            <header className="text-center pt-20">
              <h1 className="text-white text-6xl font-semibold">
                {data.data.name}
              </h1>
              <p className="text-zinc-400 pt-2">{data.data.email}</p>
              <p className="text-xl pt-2">{data.data.country[0]}</p>
            </header>
            <div className="grid gap-10 grid-cols-3 items-center mt-10">
              <div className="">
                <div className="flex items-center justify-between">
                  <h2 className="text-white flex items-center gap-3 font-medium">
                    <Activity size={19} className="text-green-500" />
                    Actividade
                  </h2>
                  <p className="text-white text-xl font-medium">
                    30 <span className="text-green-500">%</span>
                  </p>
                </div>
                <div className="w-full h-2 border-none bg-[#2c2c2c] rounded-full mt-3 overflow-hidden">
                  <div className="w-[30%] bg-green-400 h-full rounded-full"></div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white flex items-center gap-3 font-medium">
                      <Route size={19} className="text-orange-500" />
                      Pontos
                    </h2>
                    <p className="text-white text-xl font-medium">
                      {data.data.pontos}
                    </p>
                  </div>
                  <div className="w-full h-2 border-none bg-[#2c2c2c] rounded-full mt-3 overflow-hidden">
                    <div className="w-[30%] bg-orange-400 h-full rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white flex items-center gap-3 font-medium">
                      <CircleCheckBig size={19} className="text-cyan-500" />
                      Resolvidos
                    </h2>
                    <p className="text-white text-xl font-medium">
                      {data.data.resolvidos}
                    </p>
                  </div>
                  <div className="w-full h-2 border-none bg-[#2c2c2c] rounded-full mt-3 overflow-hidden">
                    <div className="w-[30%] bg-cyan-400 h-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="from-[#2c2c2c] bg-gradient-to-b p-5 mt-14 rounded-t-xl border-zinc-700 h-72 border-t border-x">
              <div className="grid grid-cols-7 h-full w-full items-center justify-center gap-6">
                <ProgressComponent progress={30} day="Seg" />
                <ProgressComponent progress={40} day="Ter" />
                <ProgressComponent progress={50} day="Qua" />
                <ProgressComponent progress={60} day="Qui" />
                <ProgressComponent progress={70} day="Sex" />
                <ProgressComponent progress={80} day="Sáb" />
                <ProgressComponent progress={100} day="Dom" />
              </div>
            </div>

            <section className="mt-24 w-full">
              <header className="flex border-b pb-6 border-zinc-700 items-center justify-between w-full">
                <div className="w-12 flex items-center text-xl justify-center text-white font-medium ring-4 ring-green-500 ring-opacity-50 h-12 bg-green-500 rounded-full">
                  {findInitial(data.data.name)}
                </div>
                <div>
                  <button className="flex items-center gap-2 font-medium text-white px-5 py-2 rounded-full bg-[#2c2c2c] border border-zinc-700 transition-all hover:border-white">
                    <Edit size={20} className="text-green-500" />
                    Editar
                  </button>
                </div>
              </header>

              <div className="w-full gap-6 grid grid-cols-1 mb-20">
                <ItemStatus camp="Username" value={data.data.name} />
                <ItemStatus camp="Email" value={data.data.email} />
                <ItemStatus
                  camp="País"
                  value={`${data.data.country[0]}  ${data.data.country[1]}`}
                />
                <div className="flex border-t pt-5 border-zinc-700 items-center justify-between">
                  <div>
                    <Link
                      to="/"
                      className="flex items-center gap-2 font-medium text-white px-5 py-2 rounded-full bg-[#2c2c2c] border border-zinc-700 transition-all hover:border-white"
                    >
                      Voltar
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={Logout}
                      className="px-6 py-2 font-medium bg-red-500 text-white rounded-full transition-all hover:bg-red-600"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <SimpleFooter />
        </main>
      )}
    </>
  );
};

export default ViewProfile;
