function Guide() {
  return (
    <section className="mt-28 max-w-5xl w-full m-auto">
      <header>
        <h3 className="text-4xl text-center font-medium text-white">Guia</h3>
      </header>

      <div className="explanation_container mt-10">
        <p className="text-white">
          <span className="text-zinc-500 text-xl">#. </span> Os exercícios são
          submetidos com uma pequena explicação sobre o que fazer com alguns
          testes básicos já resolvidos. Se você já perticipou em plataformas de
          competição, normalmente com outras linguagens de programação, como
          Javascript ou Python, possivelmente já saibas como o{" "}
          <span className="text-green-500">shelling</span> deve funcionar.
          Entratanto vamos para um exemplo simples:
        </p>
        <br />
        <p className="text-white">
          Suponhamos que esta é a descrição do exercício:
        </p>
        <div className="p-5  mt-5 rounded-md bg-[#2c2c2c]">
          <p className="text-zinc-100">
            Foram-te submetidos dois arquivos, sendo que os dois têm permição de
            leitura apenas:
          </p>
          <p className="pt-4 text-zinc-400">
            -r--r--r-- 1 morphosis 2024 0 Oct 8 14:27 file1 <br />
            -r--r--r-- 1 morphosis 2024 0 Oct 8 14:27 file2
          </p>
          <p className="pt-3 text-white">
            <span className="text-green-500 font-medium">Instrunção - </span>
            Mude as permições de modo que o{" "}
            <span className="text-green-500 font-medium">file1</span> tenha
            permição de execução para{" "}
            <span className="text-green-500 font-medium">grupos</span> e o{" "}
            <span className="text-green-500 font-medium">file2</span> tenha
            permição de escrita para{" "}
            <span className="text-green-500 font-medium">outros</span>.
          </p>
        </div>
        <p className="pt-5 text-white">
          Sendo que te foi submetido um exercício, és livre de achar uma forma
          de resolver, claro, desde que seja honesta, sendo que isso deve
          ajudar-te para seres muito bom em shell script. Entretanto estamos em
          condições de submeter o{" "}
          <span className="text-green-500 font-medium">script</span> que possa
          resolver este problema:
        </p>
        <div className="p-5  mt-5 rounded-md bg-[#2c2c2c]">
          <p className=" text-white">
            chmod g+x <span className="text-green-500">file1</span> <br />
            <br />
            chmod o+w <span className="text-green-500">file2</span>
          </p>
        </div>
        <p className="pt-4 text-white">
          Observa que não há necessidade de colocar{" "}
          <span className="text-green-500">shebang - interpretador</span>, sendo
          que o nosso compilador já faz isso. Após submeter, receberá o feedback
          sobre a resolução do problema.
        </p>
      </div>
    </section>
  );
}

export default Guide;
