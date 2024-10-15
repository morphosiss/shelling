import React, { useRef } from "react";
import Logo from "/img/logo_white.png";
import CountrySelect from '../components/ListCountries';
import useSWR from "swr"
import axios from "axios";

interface IInputGroup {
  typeData: "text" | "email" | "password";
  nameData: string;
  id: string;
  func?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  place: string;
}

const InputGroup: React.FC<IInputGroup> = ({
  typeData,
  nameData,
  id,
  labelText,
  place,
  func
}) => {
  const InputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-zinc-400 text-[15px]">
        {labelText}
      </label>
      <input
        ref={InputRef}
        type={typeData}
        name={nameData}
        id={id}
        onChange={func}
        className="py-2.5 px-4 bg-[#2c2c2c] transition-all focus:border-green-500 rounded-lg border border-zinc-700 text-white outline-none"
        placeholder={place}
      />
    </div>
  );
};

const Register: React.FC = () => {
  const [errorUserName, setUserNameError] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  
  const userNameVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length >= 1 && value.length < 3) {
      setUserNameError("Seu username deve ter no mínimo 3 caracteres");
    }
    console.log(errorUserName);
  }

  const ChangeTypeInput = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="w-full paisagem-tablet:h-screen flex justify-center items-center">
      <form className="bg-gradient-to-b paisagem-tablet:mt-0 retrato-tablet:mt-10 max-w-2xl w-full from-[#2c2c2c] to-transparent p-5 retrato-tablet:rounded-3xl shadow-3xl">
        <header className="text-center">
          <a href="/">
            <img src={Logo} alt="logo_image" className="w-28 m-auto" />
          </a>
          <small className="text-zinc-200">Preocupa-mos com os seus dados!</small>
        </header>
        <div className="grid items-center retrato-tablet:grid-cols-2 grid-cols-1 mt-10 gap-x-2 gap-y-6">
          <InputGroup
            labelText="Nome de Usuário"
            typeData="text"
            id="user_name"
            func={userNameVerification}
            nameData="user_name"
            place="Crie um nome de usuário"
          />
          <InputGroup
            labelText="E-mail"
            typeData="email"
            id="email"
           
            nameData="email"
            place="Insira seu email"
          />
          <CountrySelect key="country-select" />
          <InputGroup
            
            labelText="Criar Senha"
            typeData={showPassword ? "text" : "password"}
            id="pass"
            nameData="pass"
            place="Crie uma senha forte"
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="see_pass" onChange={ChangeTypeInput} />
            <label htmlFor="see_pass" className="text-white cursor-pointer">
              Mostrar Palavra-chave
            </label>
          </div>
          <div className="retrato-tablet:col-span-2 flex justify-between">
            <button className="px-6 transition-all hover:bg-zinc-800 hover:ring-4 hover:ring-zinc-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-zinc-900 rounded-full">
              Criar conta
            </button>
            <button className="px-6 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full">
              Entrar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
