import React from "react";
import Logo from "/img/logo_white.png";
// import CountriesSelect from '../components/ListCountries'

interface IInputGroup {
  typeData: "text" | "email" | "password";
  nameData: string;
  id: string;
  labelText: string;
  place: string
}

const InputGroup: React.FC<IInputGroup> = ({
  typeData,
  nameData,
  id,
  labelText,
  place
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="user_name" className="text-zinc-400 text-[15px]">
        {labelText}
      </label>
      <input
        type={typeData}
        name={nameData}
        id={id}
        className="py-2.5 px-4 bg-[#2c2c2c] transition-all focus:border-green-500 rounded-lg border border-zinc-700 text-white outline-none"
        placeholder={place}
      />
    </div>
  );
};

function Register() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="bg-gradient-to-b max-w-xl w-full from-[#2c2c2c] to-transparent p-5 rounded-3xl shadow-3xl">
        <header>
          <img src={Logo} alt="logo_image" className="w-28 m-auto" />
        </header>
        <div className="grid retrato-tablet:grid-cols-2 grid-cols-1 mt-10 gap-2">
          <InputGroup
            labelText="Nome de Usuário"
            typeData="text"
            id="user_name"
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
          <InputGroup
            labelText="País"
            typeData="text"
            id="pais"
            nameData="pais"
            place="Insira seu email"
          />
        
        </div>
      </div>
    </main>
  );
}

export default Register;
