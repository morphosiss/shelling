import { Github, Instagram } from "lucide-react";
import Logo from "/img/logo_white.png";
import Morphosis from "/img/logo.png";
function Footer() {
  return (
    <footer className="p-5 w-full mt-20 bg-gradient-to-b from-transparent to-[#2c2c2c]">
      <div className="max-w-7xl w-full m-auto flex justify-between">
        <div className="flex items-center gap-10">
          <a
            href="#"
            className="text-white transition-all hover:text-green-500"
          >
            <Github />
          </a>
          <a
            href="#"
            className="text-white transition-all hover:text-green-500"
          >
            <Instagram />
          </a>
        </div>
        <div>
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
                Rank
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mt-16 max-w-7xl w-full m-auto items-center justify-between ">
        <div>
          <img src={Logo} alt="logo_image" className="w-28" />
        </div>
        <div>
          <img src={Morphosis} alt="logo_image" className="w-28" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
