"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

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

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Murdle Companion BR
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Anel Decifrador Código Detetive (<a href="https://pt.wikipedia.org/wiki/Atbash">Cifra de Atbash</a>)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Digite o texto cifrado (ou texto plano) abaixo para traduzir automaticamente.
          </p>
          
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Digite o texto aqui..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          <h3 className="text-lg font-medium mb-2">Resultado:</h3>
          <div className="w-full min-h-[8rem] p-3 bg-gray-50 border border-gray-200 rounded whitespace-pre-wrap">
            {inputText ? decodeAtbash(inputText) : <span className="text-gray-400">A traducao aparecera aqui...</span>}
          </div>
        </div>
      </div>
    </main>
  );
}