import { Menu, Network, ShieldHalf, Unplug, UserPlus, Zap } from "lucide-react";
import Logo from "/img/logo_white.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ReactNode, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

interface ICard {
  icon: ReactNode;
  title: string;
  desc: string;
}

const Card: React.FC<ICard> = ({ icon, title, desc }) => {

  return (
    <div className="w-full bg-gradient-to-b rounded-t-xl from-green-600 to-transparent p-5">
      <header>{icon}</header>
      <div className="pt-6">
        <h2 className="text-xl text-white font-medium">{title}</h2>
        <p className="text-[14px] pt-3 text-white">{desc}</p>
      </div>
    </div>
  );
};

const BannerIntial = () => {


  return (
    <section className="paisagem-tablet:mt-44 mt-24">
      <div className="max-w-6xl p-4 pt-10 m-auto w-full text-center">

        <h1 className="text-white desktop:text-7xl paisagem-tablet:text-5xl retrato-tablet:text-4xl text-3xl font-medium">
          Teste seus conhecimentos em{" "}
          <span className="text-green-500 underline">shell script</span> de
          maneira eficiente!{" "}
        </h1>
        <div className="pt-8 max-w-4xl w-full m-auto">
          <p className="text-white retrato-tablet:text-[18px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non
            reiciendis sunt vero, consequuntur placeat, blanditiis sit labore
            similique laborum ipsa veritatis necessitatibus, sapiente quasi
            fugit! Animi quod delectus laudantium!

          </p>
        </div>
        <div className="items-center pt-6 flex justify-center">
          <a
            href="#"
            className="px-6 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-l-full"
          >
            Começar
          </a>
          <a
            href="#"
            className="px-6 transition-all hover:ring-4 hover:ring-zinc-100 hover:ring-opacity-25 font-medium py-2.5 text-[#242424] bg-white rounded-r-full"
          >
            Introdução
          </a>
        </div>
      </div>

      <div className="grid retrato-tablet:grid-cols-2 p-5 grid-cols-1  paisagem-tablet:grid-cols-4 mx-auto mt-20 max-w-7xl w-full desktop:gap-3 gap-1">
        <Card
          icon={<Zap size={21} className="text-white" />}
          title="Prática"
          desc="Na nossa plataforma, o aprendizado não se limita a teoria. Com exercícios
          práticos e desafios que vão desde o básico até níveis avançados, você terá a 
          oportunidade de aplicar imediatamente o que aprendeu. "
        />
        <Card
          icon={<ShieldHalf size={21} className="text-white" />}
          title="Ambiente Seguro"
          desc="Nosso ambiente permite que você experimente sem preocupações. Ao praticar em um sistema seguro,
          você pode testar diferentes scripts e comandos sem o risco de causar danos a um sistema real. "
        />
        <Card
          icon={<Network size={21} className="text-white" />}
          title="Comunidade e Colaboração"
          desc="Fazemos questão de fomentar um ambiente colaborativo. Através de fóruns e grupos de discussão, você poderá interagir com outros usuários, trocar experiências e resolver dúvidas coletivamente."
        />{" "}
        <Card
          icon={<Unplug size={21} className="text-white" />}
          title="Feedback Imediato"
          desc="Um dos grandes diferenciais da nossa plataforma é o feedback instantâneo. Ao executar seus scripts, você receberá respostas
           imediatas sobre seu desempenho, permitindo que identifique erros e melhore rapidamente suas habilidades."
        />
      </div>
    </section>
  );
};

function Header() {
  const { jsonData } = useParams<{ jsonData?: string }>();
  const [parseData, setParseData] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined)
  const [userName, setUserName] = useState<string | undefined>(undefined)
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [verifyShow, setVerifyShow] = useState<string | undefined>(undefined);


  function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const findInitial = (str: string | undefined) => {
    return str ? capitalize(str.slice(0, 2)) : '';
  }
  useEffect(() => {
    try {
      if (jsonData) {
        const decodedData = decodeURIComponent(jsonData);
        setParseData(JSON.parse(decodedData));
        if (Cookies.get('show_message')) {
          toast.success("Usuário Criado com Sucesso");
          Cookies.remove('show_message');
        }
        setVerifyShow(Cookies.get('show_message'))
      }
    } catch (error) {
      console.error("Erro ao parsear JSON:", error);
      setParseData(null);
    }
  }, [jsonData]);

  useEffect(() => {
    setToken(Cookies.get('token'))
    setUserName(Cookies.get('username'))
    setUserId(Cookies.get('id'))
  })

  return (
    <header className="w-full">
      {jsonData && <Toaster position="top-center" />}
      <div className="navbar bg-[#242424] fixed top-0 left-0 right-0 border-b border-zinc-700 flex paisagem-tablet:px-8 px-4 py-4 w-full justify-between paisagem-tablet:justify-around items-center">
        <div>
          <img src={Logo} alt="logo_image" className="w-32" />
        </div>
        <nav className="paisagem-tablet:inline-flex hidden">
          <ul className="flex items-center gap-12">
            <li>
              <a
                href="#guia"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                Guia
              </a>
            </li>
            <Link
              to="/desafios"
              className="text-zinc-300 font-medium transition-all hover:text-white"
            >
              Desafios
            </Link>

            <li>
              <a
                href="#"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                Rank
              </a>
            </li>
            {token ? (
              <Link to="/profile" className="w-10 flex items-center justify-center text-white font-medium ring-4 ring-green-500 ring-opacity-50 h-10 bg-green-500 rounded-full">
                {findInitial(userName)}
              </Link>
            ) : (
              <>
                <li>
                  <Tippy content="Cadastre-se">
                    <Link to="/register" className="text-zinc-300 font-medium transition-all hover:text-white">
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
      <BannerIntial />
    </header>
  );
}

export default Header;
