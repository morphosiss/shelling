import { UserPlus } from "lucide-react";
import Logo from "/img/logo_white.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Header() {
  return (
    <header className="w-full">
      <div className="navbar border-b border-zinc-700 flex px-8 py-4 w-full justify-around items-center">
        <div>
          <img src={Logo} alt="logo_image" className="w-32" />
        </div>
        <nav>
          <ul className="flex items-center gap-12">
            <li>
              <a
                href="#"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                Guia
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                Desafios
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-zinc-300 font-medium transition-all hover:text-white"
              >
                Contribua
              </a>
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
                className="px-6 font-medium py-2.5 text-white bg-green-600 rounded-full"
              >
                Entrar
              </a>
            </li>
           
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
