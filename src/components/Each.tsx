import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface EachProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const Each: React.FC<EachProps> = ({ value = false, setValue }) => {
  const [code, setCode] = useState("# Seu código aparecerá aqui");

  const keyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.currentTarget;

      const newValue = `${e.currentTarget.value.substring(0, selectionStart)}\t${e.currentTarget.value.substring(selectionEnd)}`;
      setCode(newValue);
      e.currentTarget.value = newValue;
    }
  };

  const updateValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setCode(newValue);

    if (newValue === "") {
      setCode("# Seu código aparecerá aqui");
    }
  };

  return (
    <aside
      className={`fixed each_exe ${value ? "showExe" : ""} w-full h-screen z-20 top-0 left-0 right-0 bg-[#242424]`}
    >
      <div className="max-w-[80%] w-full m-auto p-5">
        <header className="w-full border-b pb-4 border-zinc-600 flex items-center justify-between">
          <div>
            <h3 className="text-xl text-white font-medium">
              <span className="text-green-500">#</span> Saltando entre pontos
            </h3>
          </div>
          <div>
            <p className="text-[14px] px-6 font-medium ring-4 ring-yellow-500 ring-opacity-15 py-1.5 text-yellow-400 bg-opacity-20 rounded-full bg-yellow-500">
              Tigre
            </p>
          </div>
        </header>

        <div className="mt-10">
          <small className="text-zinc-300">67 Pessoa(s) resolveram</small>

          <div className="grid pt-10 w-full gap-5 grid-cols-7">
            <div className="col-span-5">
              <h4 className="text-white font-medium">Desafio</h4>
              <p className="text-white pt-3">
                Crie um script em Shell que receba como entrada o caminho de um
                diretório e liste todos os arquivos contidos nele. O script deve
                exibir tanto os arquivos visíveis quanto os ocultos (arquivos
                que começam com um ponto .). Caso o diretório não seja informado
                ou não exista, o script deve exibir uma mensagem de erro
                apropriada.
              </p>

              <div className="mt-5 shadow-2xl space-y-4 bg-[#2c2c2c] p-5 rounded-lg">
                <div className="input">
                  <p className="text-white">
                    <span className="text-green-500">Entrada:</span> Caminho de
                    um diretório (pode ser absoluto ou relativo).
                  </p>
                </div>
                <div>
                  <p className="text-white">
                    <span className="text-green-500">Saída:</span> Uma lista de
                    todos os arquivos (visíveis e ocultos) presentes no
                    diretório informado. Se o diretório não for informado ou não
                    existir, deve ser exibida uma mensagem de erro.
                  </p>
                </div>
              </div>

              <form>
                <div className="mt-4">
                  <textarea
                    name="script"
                    id="script"
                    placeholder="Insira aqui seu script..."
                    className="w-full text-white p-5 outline-none bg-[#2c2c2c] rounded-lg border border-green-500"
                    rows={5}
                    onKeyDown={keyEvent}
                    onChange={updateValue}
                  ></textarea>
                  <div className="flex pt-2 items-center justify-between">
                    <p className="text-white font-medium">
                      <span className="text-green-500">100</span> Pontos
                    </p>
                    <button
                      type="button"
                      className="px-6 text-[15px] flex items-center gap-2 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full"
                    >
                      Enviar
                      <SendHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-4 border-t pt-5 border-zinc-600">
                <button
                  onClick={() => setValue(false)}
                  className="px-6 text-[15px] flex items-center gap-2 transition-all hover:bg-red-700 hover:ring-4 hover:ring-red-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-red-600 rounded-full"
                >
                  Abandonar
                </button>
              </div>
            </div>
            <div className="col-span-2 flex items-start justify-start bg-[#2c2c2c] h-full rounded-lg shadow-2xl">
              <SyntaxHighlighter
                language="shell"
                className="h-full w-full"
                style={atomDark}
                customStyle={{
                  backgroundColor: "#2c2c2c",
                  borderRadius: "10px",
                  padding: "5px 20px",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Each;
