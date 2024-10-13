import React from "react"

interface ICardProfile {
    pathhImg: string;
    name: string;
    area: string;
    comment: string;
}

const CardProfile: React.FC<ICardProfile> = ({

    pathhImg,
    name,
    area,
    comment,
}) => {
    return (
        <div className="from-transparent bg-gradient-to-br to-green-700 rounded-2xl p-5">
            <header className="flex flex-col">
                <div>
                    <p className="text-[13px] border border-green-600 bg-green-900 text-white px-5 py-1 rounded-full inline-block font-medium">
                        {area}
                    </p>
                </div>
                <div className="flex mt-10 items-center gap-4">
                    <img
                        src={pathhImg}
                        alt="avatar_image"
                        className="w-12 h-12 rounded-full ring-4 ring-zinc-700 ring-opacity-20"
                    />
                    <div>
                        <h5 className="text-white leading-none font-medium">{name}</h5>
                    </div>
                </div>
            </header>
            <div className="pt-5">
                <p className="text-[14px] text-white">{comment}</p>
            </div>
        </div>
    );
};

const Equipa = () => {
    return (
        <section className="mt-10">
            <header className="flex items-center justify-center relative">
                <h3 className="text-center ring-4 ring-zinc-600 ring-opacity-10 bg-zinc-950 uppercase px-4  py-2 rounded-full absolute text-white">
                    Colboradores
                </h3>
                <hr className=" bg-zinc-950 border-zinc-700 w-full" />
            </header>

            <div className="max-w-7xl mb-5 gap-4 mt-20 w-full m-auto grid paisagem-tablet:grid-cols-3 retrato-tablet:grid-cols-2 grid-cols-1 p-4">
                <CardProfile
                    pathhImg={"https://picsum.photos/200/300"}
                    area="Desenvolvedor Back-end"
                    name="Justino Soares"
                    comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit impedit in reiciendis adipisci. Impedit vero pariatur distinctio optio facere iste?"
                />
                <CardProfile
                    pathhImg={"https://picsum.photos/200/300"}
                    area="Designer UI/UX & Front-end"
                    name="Mário Salembe"
                    comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit impedit in reiciendis adipisci. Impedit vero pariatur distinctio optio facere iste?"
                />
                <CardProfile
                    pathhImg={"https://picsum.photos/200/300"}
                    area="Desenvolvedor Back-end"
                    name="Romão Quimaliquiza"
                    comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit impedit in reiciendis adipisci. Impedit vero pariatur distinctio optio facere iste?"
                />
            </div>
        </section>
    )
}

export default Equipa