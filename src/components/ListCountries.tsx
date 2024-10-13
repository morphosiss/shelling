import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fingerprint } from "lucide-react";
interface Country {
    name: string;
    value: string;
    flag: string;
}

const CountrySelect: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const countryList: Country[] = response.data.map((country: any) => ({
                    name: country.name.common,
                    value: country.cca2,
                    flag: country.flags.svg,
                }));

                const sortedCountries = countryList.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setCountries(sortedCountries);
            } catch (error) {
                console.error("Erro ao buscar os países:", error);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const country = countries.find((c) => c.value === selectedValue);
        setSelectedCountry(country || null);
    };

    return (
        <div className="gap-3 flex flex-col max-w-md mx-auto">
            <label htmlFor="country" className="text-zinc-400 text-[15px]">
                Selecione seu país
            </label>

            <div className="flex px-3 border border-zinc-700 rounded-lg bg-[#2c2c2c] items-center gap-2">
                {selectedCountry ? (
                    <div className="flex items-center">
                        <img
                            src={selectedCountry.flag}
                            alt={`Bandeira de ${selectedCountry.name}`}
                            className="w-6 h-auto object-cover mr-3"
                        />
                    </div>
                ) : (
                    <Fingerprint size={22} className="text-green-500" />
                )}
                <select
                    id="country"
                    name="country"
                    defaultValue={"all"}
                    className="block w-full border-zinc-700 border-l ps-2 py-2.5 outline-none text-white bg-[#2c2c2c]"
                    onChange={handleChange}
                >
                    <option value="all" className="text-zinc-700">
                        Selecione um país
                    </option>
                    {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CountrySelect;
