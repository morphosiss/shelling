import { FileCheck2, FilePenLine, PanelTopClose, Search, UserRoundPen } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import '../App.css';
import Tippy from "@tippyjs/react";
import React, { useState } from "react";

interface ICardSubject {
    tittle: string;
    level: string;
    color: "yellow" | "green" | "red";
    points: number;
    subject: string;
    fileNameTester: string
}

const CardSubject: React.FC<ICardSubject> = ({ tittle, level, points, subject, fileNameTester, color }) => {
    const [expand, setExpand] = useState<boolean>(false)

    const changeStatus = () => {
        setExpand((prev) => !prev)
    }
    const colorClasses = {
        yellow: {
            ring: "ring-yellow-100",
            text: "text-yellow-500",
            bg: "bg-yellow-300",
        },
        green: {
            ring: "ring-green-100",
            text: "text-green-500",
            bg: "bg-green-300",
        },
        red: {
            ring: "ring-red-100",
            text: "text-red-500",
            bg: "bg-red-300",
        },
    };
    return (
        <div className={`p-5 relative ${expand ? "" : "max-h-80"} transition-all overflow-hidden shadow-lg bg-gradient-to-br rounded-xl border border-zinc-800 from-[#111111] to-transparent`}>
            <div className={`${expand ? "hidden" : "absolute"} flex items-end justify-center p-5 top-0 left-0 right-0 w-full h-full z-20 bg-gradient-to-b from-transparent to-[#111111]`}>
                <button onClick={changeStatus} className="px-6 text-[15px] transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full">
                    Expandir
                </button>
            </div>
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-white text-xl">
                        <span className="text-zinc-600">#</span> {tittle}
                    </h1>
                    <p className="text-white font-medium ps-5">XL - <span className="text-green-500">{points}</span></p>
                </div>
                <div className="flex items-center gap-5">
                    <p
                        className={`text-[14px] px-6 font-medium ring-4 ${colorClasses[color].ring} ring-opacity-15 py-1.5 ${colorClasses[color].text} bg-opacity-20 rounded-full ${colorClasses[color].bg}`}
                    >
                        {level}
                    </p>
                </div>
            </header>

            <div className="bg-[#111111] mt-10 border border-zinc-700 p-5 text-[14px] rounded-lg">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
                    className="markdown-body bg-transparent"
                >
                    {subject}
                </ReactMarkdown>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <p className="rounded-lg border border-zinc-700 text-[14px] items-center text-white px-6 py-2 gap-2 bg-[#111111] inline-flex"><FileCheck2 size={18} /> {fileNameTester}</p>
                <div className="flex items-center gap-5">
                    <Tippy content="Editar">
                        <button className="text-white transition-all hover:text-green-500">
                            <FilePenLine size={20} />
                        </button>
                    </Tippy>
                    <Tippy content="Ocultar">
                        <button onClick={changeStatus} className="text-white transition-all hover:text-green-500">
                            <PanelTopClose size={20} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </div>
    )
}

const AllExe = () => {

    const exerciseMarkdown = `

## Requisitos

1. O script deve ser executável.
2. O script deve aceitar um argumento que é o caminho para o arquivo de texto.
3. O script deve verificar se o arquivo existe e é legível.
4. O script deve contar o número de palavras e exibir o resultado no formato: \`O número total de palavras é: X\`, onde \`X\` é o número total de palavras.

## Exemplo de Uso

\`\`\`bash
./contador_palavras.sh arquivo.txt
\`\`\`

**Saída Esperada:**

\`\`\`
O número total de palavras é: 42
\`\`\`

## Dicas

- Você pode usar o comando \`wc\` (word count) para contar palavras.
- Utilize estruturas condicionais para verificar a existência do arquivo.
- Considere tratar erros caso o arquivo não exista ou não seja legível.

## Entrega

- Envie o seu script nomeado como \`contador_palavras.sh\`.
    `;

    return (
        <div className="max-w-[90%] w-full m-auto pt-10">
            <header>
                <div className="flex mt-6 mb-8 col-span-full transition-all focus-within:border-green-500 w-full items-center border border-zinc-700 gap-3 px-4 bg-[#2c2c2c] rounded-lg">
                    <Search size={20} className="text-zinc-500" />
                    <input
                        type="text"
                        name="text"
                        id="text"
                        className="outline-none w-full text-white bg-transparent py-3"
                        placeholder="Busque por um nome..."
                    />
                </div>
            </header>

            <div className="grid gap-5 paisagem-tablet:grid-cols-2 grid-cols-1">
                <CardSubject tittle="Saltanto entre pontos" color="green" level="Leão" fileNameTester="script44224.sh" points={9000} subject={exerciseMarkdown} />
                <CardSubject tittle="Achando a Minoria" color="yellow" level="Girafa" fileNameTester="script44224.sh" points={3000} subject={exerciseMarkdown} />
                <CardSubject tittle="Achando a Minoria" color="yellow" level="Girafa" fileNameTester="script44224.sh" points={3000} subject={exerciseMarkdown} />
            </div>
        </div>
    );
}

export default AllExe;
