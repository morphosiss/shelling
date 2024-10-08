import { Network, ShieldHalf, Unplug, UserPlus, Zap } from "lucide-react";
import Logo from "/img/logo_white.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ICard {
  icon: ReactNode;
  title: string;
  desc: string;
}

const Card: React.FC<ICard> = ({ icon, title, desc }) => {
  return (
    <div className="w-80 bg-gradient-to-b rounded-t-xl from-green-600 to-transparent p-5">
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
    <section className="mt-44">
      <div className="max-w-6xl pt-10 m-auto w-full text-center">
        <h1 className="text-white text-7xl font-medium">
          Teste seus conhecimentos em{" "}
          <span className="text-green-500 underline">shell script</span> de
          maneira eficiente!{" "}
        </h1>
        <div className="pt-8 max-w-4xl w-full m-auto">
          <p className="text-white text-[18px]">
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

      <div className="grid grid-cols-4 mx-auto mt-20 max-w-7xl w-full gap-5">
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
  return (
    <header className="w-full">
      <div className="navbar bg-[#242424] fixed top-0 left-0 right-0 border-b border-zinc-700 flex px-8 py-4 w-full justify-around items-center">
        <div>
          <img src={Logo} alt="logo_image" className="w-32" />
        </div>
        <nav>
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
      </div>
      <BannerIntial />
    </header>
  );
}

export default Header;
