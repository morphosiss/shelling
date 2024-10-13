import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

const ListExe = () => {
    const [mark, setMark] = useState<string>("");

    const convertMark = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMark(e.target.value);
    };

    return (
        <div className="max-w-7xl w-full m-auto pt-10">
            <form className="grid grid-cols-1 gap-6">
                <div className="input_group flex flex-col space-y-4">
                    <label htmlFor="tittleExercice" className="text-zinc-300">Exercício</label>
                    <input
                        type="text"
                        name="tittleExercice"
                        id="tittleExercice"
                        placeholder="Insira um título ao exercício..."
                        className="py-2.5 px-4 bg-[#2c2c2c] transition-all focus:border-green-500 rounded-lg border border-zinc-700 text-white outline-none"
                    />
                </div>
                <div className="input_group flex flex-col space-y-4">
                    <label htmlFor="desc" className="text-zinc-300">Descrição</label>
                    <textarea
                        onChange={convertMark}
                        rows={6}
                        name="desc"
                        id="desc"
                        className="py-2.5 px-4 bg-[#2c2c2c] transition-all focus:border-green-500 rounded-lg border border-zinc-700 text-white outline-none"
                        placeholder="Escreva em markdown a descrição"
                    ></textarea>
                    <small className="text-zinc-400">
                        Sinta-se à vontade para escrever código <span className="text-green-500">markdown</span>
                    </small>
                </div>
                <div className="bg-transparent border border-zinc-700 p-5 text-[14px] rounded-lg">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
                        className="markdown-body bg-transparent"
                    >
                        {mark || "Esperando Mudanças..."}
                    </ReactMarkdown>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="picture" className="text-zinc-300">Script de Teste</label>
                    <Input id="picture" type="file" />
                </div>
                <div>
                    <button className="px-6 transition-all hover:bg-green-700 hover:ring-4 hover:ring-green-500 hover:ring-opacity-25 font-medium py-2.5 text-white bg-green-600 rounded-full">
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ListExe