"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [cipherType, setCipherType] = useState("atbash");
  
  const [searchDay, setSearchDay] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  
  const zodiacSigns = [
    { name: "Aries", symbol: "Carneiro", element: "Fogo", start: "03-21", end: "04-19", icon: "/icons/aries.png" },
    { name: "Touro", symbol: "Touro", element: "Terra", start: "04-20", end: "05-20", icon: "/icons/taurus.png" },
    { name: "Gemeos", symbol: "Gemeos", element: "Ar", start: "05-21", end: "06-20", icon: "/icons/gemini.png" },
    { name: "Cancer", symbol: "Caranguejo", element: "Agua", start: "06-21", end: "07-22", icon: "/icons/cancer.png" },
    { name: "Leao", symbol: "Leao", element: "Fogo", start: "07-23", end: "08-22", icon: "/icons/leo.png" },
    { name: "Virgem", symbol: "Virgem", element: "Terra", start: "08-23", end: "09-22", icon: "/icons/virgo.png" },
    { name: "Libra", symbol: "Balanca", element: "Ar", start: "09-23", end: "10-22", icon: "/icons/libra.png" },
    { name: "Escorpiao", symbol: "Escorpiao", element: "Agua", start: "10-23", end: "11-21", icon: "/icons/scorpio.png" },
    { name: "Sagitario", symbol: "Arqueiro", element: "Fogo", start: "11-22", end: "12-21", icon: "/icons/sagittarius.png" },
    { name: "Capricornio", symbol: "Capricornia", element: "Terra", start: "12-22", end: "01-19", icon: "/icons/capricorn.png" },
    { name: "Aquario", symbol: "Portador de Agua", element: "Ar", start: "01-20", end: "02-18", icon: "/icons/aquarius.png" },
    { name: "Peixes", symbol: "Peixes", element: "Agua", start: "02-19", end: "03-20", icon: "/icons/pisces.png" }
  ];

  const decodeAtbash = (text: string) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const reversedAlphabet = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    let result = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i].toUpperCase();
      let index = alphabet.indexOf(char);

      if (index !== -1) {
        let isLowerCase = text[i] === text[i].toLowerCase() && text[i] !== text[i].toUpperCase();
        let newChar = reversedAlphabet[index];
        result += isLowerCase ? newChar.toLowerCase() : newChar;
      } else {
        result += text[i];
      }
    }
    return result;
  };

  // Funcao unificada para Cifra de Cesar (aceita deslocamentos positivos ou negativos)
  const decodeCaesar = (text: string, shift: number) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i].toUpperCase();
      let index = alphabet.indexOf(char);

      if (index !== -1) {
        let isLowerCase = text[i] === text[i].toLowerCase() && text[i] !== text[i].toUpperCase();
        // O +26 garante que numeros negativos funcionem corretamente no modulo
        let newIndex = (index + shift + 26) % 26;
        let newChar = alphabet[newIndex];
        result += isLowerCase ? newChar.toLowerCase() : newChar;
      } else {
        result += text[i];
      }
    }
    return result;
  };

  const getDecodedText = () => {
    if (!inputText) return "";
    
    if (cipherType === "atbash") {
      return decodeAtbash(inputText);
    } else if (cipherType === "caesar-minus-1") {
      return decodeCaesar(inputText, -1);
    } else if (cipherType === "caesar-plus-1") {
      return decodeCaesar(inputText, 1);
    }
    return inputText;
  };

  const filteredSigns = zodiacSigns.filter((sign) => {
    if (!searchMonth || !searchDay) return true;

    const formattedDate = `${searchMonth.padStart(2, "0")}-${searchDay.padStart(2, "0")}`;
    
    if (sign.start <= sign.end) {
      return formattedDate >= sign.start && formattedDate <= sign.end;
    } else {
      return formattedDate >= sign.start || formattedDate <= sign.end;
    }
  });

  const clearDateSearch = () => {
    setSearchDay("");
    setSearchMonth("");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900 flex flex-col gap-6">
      
      <div className="max-w-2xl w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Murdle Companion BR
        </h1>
        
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Anel Decifrador</h2>
              <p className="text-sm text-gray-600">
                Selecione o tipo de cifra e digite o texto para traduzir.
              </p>
            </div>
            
            <div className="w-full sm:w-auto">
              <label className="sr-only">Tipo de Cifra</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium"
                value={cipherType}
                onChange={(e) => setCipherType(e.target.value)}
              >
                <option value="atbash">Atbash (Invertida)</option>
                <option value="caesar-plus-1">Cesar: Avancar 1 Letra (+1) (Tlz para Uma)</option>
                <option value="caesar-minus-1">Cesar: Recuar 1 Letra (-1) (gbdb para faca)</option>
              </select>
            </div>
          </div>
          
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Digite o texto cifrado aqui..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          <h3 className="text-lg font-medium mb-2">Resultado:</h3>
          <div className="w-full min-h-[8rem] p-3 bg-gray-50 border border-gray-200 rounded whitespace-pre-wrap">
            {inputText ? getDecodedText() : <span className="text-gray-400">A traducao aparecera aqui...</span>}
          </div>
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto bg-white p-6 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Referencia de Signos</h2>
        
        <div className="mb-6 flex items-end gap-3 bg-gray-50 p-4 rounded border border-gray-200">
          
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Dia</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              value={searchDay}
              onChange={(e) => setSearchDay(e.target.value)}
            >
              <option value="">-</option>
              {Array.from({ length: 31 }, (_, i) => (i + 1).toString()).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Mes</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              value={searchMonth}
              onChange={(e) => setSearchMonth(e.target.value)}
            >
              <option value="">-</option>
              <option value="1">Jan</option>
              <option value="2">Fev</option>
              <option value="3">Mar</option>
              <option value="4">Abr</option>
              <option value="5">Mai</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Ago</option>
              <option value="9">Set</option>
              <option value="10">Out</option>
              <option value="11">Nov</option>
              <option value="12">Dez</option>
            </select>
          </div>

          {(searchDay || searchMonth) && (
            <button 
              onClick={clearDateSearch}
              className="p-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded transition-colors"
            >
              Limpar
            </button>
          )}
          
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Signo</th>
                <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Simbolo</th>
                <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Elemento</th>
                <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Periodo</th>
              </tr>
            </thead>
            <tbody>
              {filteredSigns.length > 0 ? (
                filteredSigns.map((sign) => (
                  <tr key={sign.name} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800 font-medium">
                      <div className="flex items-center gap-2">
                        <img 
                          src={sign.icon} 
                          alt={`Icone de ${sign.name}`} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        {sign.name}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{sign.symbol}</td>
                    <td className={`px-4 py-2 text-sm font-semibold ${
                      sign.element === "Fogo" ? "text-red-600" :
                      sign.element === "Terra" ? "text-amber-800" :
                      sign.element === "Ar" ? "text-blue-400" : "text-blue-700"
                    }`}>
                      {sign.element}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {sign.start.split("-").reverse().join("/")} ate {sign.end.split("-").reverse().join("/")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                    Nenhum signo encontrado para essa data. Verifique se o dia e o mes estao corretos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="max-w-2xl w-full mx-auto mt-4 text-center text-sm text-gray-500 flex flex-col items-center gap-4">
        
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <span>Criado por rarfsz</span>
          <a 
            href="https://github.com/rafaeljsouza" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            title="Acessar GitHub"
          >
            <img 
              src="/icons/github.png" 
              alt="GitHub" 
              className="w-5 h-5 object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </a>
        </div>

        <details className="cursor-pointer text-xs text-gray-400 group">
          <summary className="hover:text-gray-600 outline-none p-2">
            Creditos dos Icones (Flaticon)
          </summary>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-lg border border-gray-200 p-3 rounded bg-white">
            <a href="https://www.flaticon.com/free-icons/aries" target="_blank" rel="noopener noreferrer" className="hover:underline">Aries por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/taurus" target="_blank" rel="noopener noreferrer" className="hover:underline">Touro por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/gemini" target="_blank" rel="noopener noreferrer" className="hover:underline">Gemeos por bqlqn</a>
            <a href="https://www.flaticon.com/free-icons/cancer" target="_blank" rel="noopener noreferrer" className="hover:underline">Cancer por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/leo" target="_blank" rel="noopener noreferrer" className="hover:underline">Leao por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/virgo" target="_blank" rel="noopener noreferrer" className="hover:underline">Virgem por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/libra" target="_blank" rel="noopener noreferrer" className="hover:underline">Libra por Prosymbols Premium</a>
            <a href="https://www.flaticon.com/free-icons/scorpio" target="_blank" rel="noopener noreferrer" className="hover:underline">Escorpiao por Aranagraphics</a>
            <a href="https://www.flaticon.com/free-icons/sagittarius" target="_blank" rel="noopener noreferrer" className="hover:underline">Sagitario por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/capricorn" target="_blank" rel="noopener noreferrer" className="hover:underline">Capricornio por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/aquarius" target="_blank" rel="noopener noreferrer" className="hover:underline">Aquario por Aranagraphics</a>
            <a href="https://www.flaticon.com/free-icons/zodiac-pack" target="_blank" rel="noopener noreferrer" className="hover:underline">Zodiac pack por Freepik</a>
            <a href="https://www.flaticon.com/free-icons/github" target="_blank" rel="noopener noreferrer" className="hover:underline">Github por riajulislam</a>
          </div>
        </details>

      </footer>

    </main>
  );
}