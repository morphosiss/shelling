import React, { useRef, useEffect, useState } from "react";
import Logo from "/img/logo_white.png";
import CountrySelect from "@/components/ListCountries";
import {
  validateUserName,
  validateEmail,
  validatePass,
} from "../components/Validator";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface IInputGroup {
  typeData: "text" | "email" | "password";
  nameData: string;
  id: string;
  func?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  place: string;
  textError?: string;
}

const InputGroup: React.FC<IInputGroup> = ({
  typeData,
  nameData,
  id,
  labelText,
  place,
  func,
  textError,
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
        className={`py-2.5 px-4 bg-[#2c2c2c] transition-all ${textError?.length != 0
          ? "focus:border-red-600"
          : "focus:border-green-500"
          } rounded-lg border ${textError?.length != 0 ? "border-red-400" : "border-zinc-700"
          } text-white outline-none`}
        placeholder={place}
      />
      <small className="text-red-400">{textError}</small>
    </div>
  );
};

const Register: React.FC = () => {
  const [errorUserName, setUserNameError] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPass, setErrorPass] = useState<string>("");
  const [errorPais, setErrorPais] = useState<string>("");
  const [valueCountry, setValueCountry] = useState<string>("");
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPassValid, setIsPassValid] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loadCountry, setLoadCountry] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isUserNameValid &&
      isEmailValid &&
      isPassValid &&
      valueCountry.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isUserNameValid, isEmailValid, isPassValid, valueCountry]);

  const userNameVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const errorMessage = validateUserName(value);
    setUserNameError(errorMessage);
    setIsUserNameValid(errorMessage.length === 0 && value.length > 0);
  };

  const emailVerification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const errorMessage = validateEmail(value);
    setErrorEmail(errorMessage);
    setIsEmailValid(errorMessage.length === 0 && value.length > 0);
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const errorMessage = validatePass(value);
    setErrorPass(errorMessage);
    setIsPassValid(errorMessage.length === 0 && value.length > 0);
  };

  const [loadindData, setLoadingData] = useState<boolean>(false);

  const sendData = async (data: Object) => {
    setLoadingData(true);
    const url = "https://shell-git-master-justino-soares-projects.vercel.app/api/create_user";

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const allResponse = error.response?.data.errors;
        allResponse.forEach((dataValue: { campo: string; msg: string }) => {
          if (dataValue.campo == "name")
            setUserNameError(dataValue.msg)
          if (dataValue.campo == "email")
            setErrorEmail(dataValue.msg)
          if (dataValue.campo == "password")
            setErrorPass("A password deve ter no mínimo 8 caracteres")
          if (valueCountry == "" || valueCountry.length == 0)
            setErrorPais("Selecione seu país")
          else
            setErrorPais("")
        });
      } else {
        console.error('Erro:', error);
      }
    } finally {
      setLoadingData(false);
    }
  };

  const SendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: e.currentTarget.user_name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.pass.value,
      pais: valueCountry,
    };
    await sendData(data)
  };

  const ChangeTypeInput = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="w-full paisagem-tablet:h-screen flex justify-center items-center">
      <form
        method="POST"
        onSubmit={SendData}
        className="bg-gradient-to-b relative paisagem-tablet:mt-0 retrato-tablet:mt-10 max-w-2xl w-full from-[#2c2c2c] to-transparent p-5 retrato-tablet:rounded-3xl shadow-3xl"
      >
        {loadCountry && (
          <div className="text-white absolute top-0 right-0 w-full h-full bg-[#242424] flex items-center justify-center z-30">
            <span className="loader"></span>
          </div>
        )}
        <header className="text-center">
          <a href="/">
            <img src={Logo} alt="logo_image" className="w-28 m-auto" />
          </a>
          <small className="text-zinc-200">
            Preocupa-mos com os seus dados!
          </small>
        </header>
        <div className="grid items-start retrato-tablet:grid-cols-2 grid-cols-1 mt-10 gap-x-2 gap-y-6">
          <InputGroup
            labelText="Nome de Usuário"
            typeData="text"
            id="user_name"
            func={userNameVerification}
            nameData="user_name"
            place="Crie um nome de usuário"
            textError={errorUserName}
          />
          <InputGroup
            labelText="E-mail"
            typeData="email"
            id="email"
            func={emailVerification}
            nameData="email"
            place="Insira seu email"
            textError={errorEmail}
          />
          <CountrySelect
            setValueCountry={setValueCountry}
            setCountryLoading={setLoadCountry}
            textError={errorPais}
          />
          <InputGroup
            labelText="Criar Senha"
            typeData={showPassword ? "text" : "password"}
            id="pass"
            func={validatePassword}
            nameData="pass"
            place="Crie uma senha forte"
            textError={errorPass}
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="see_pass" onChange={ChangeTypeInput} />
            <label htmlFor="see_pass" className="text-white cursor-pointer">
              Mostrar Palavra-chave
            </label>
          </div>
          <div className="retrato-tablet:col-span-2 flex justify-between">
            <Link to="/" className="px-6 transition-all hover:bg-zinc-800 hover:ring-4 hover:ring-zinc-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-zinc-900 rounded-full">
              Voltar
            </Link>
            <button
              disabled={isButtonDisabled}
              className={`px-6 transition-all font-medium py-2.5 text-white bg-green-600 rounded-full ${isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25"
                }`}
            >
              {loadindData ? (
                <span className="loader2"></span>
              ) : (
                "Criar"
              )}
            </button>
          </div>
          <div className="text-center pt-5 retrato-tablet:col-span-2">
            <Link to="/login" className="text-white transition-all hover:text-zinc-400">
              Já tem uma conta? <span className="text-green-500">Entrar</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
