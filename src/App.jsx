import React, { useState, useCallback, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null); // Create a ref for the input field

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%&*/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select(); // Select the text
      passwordRef.current.setSelectionRange(0, 9999); // For mobile support
      navigator.clipboard.writeText(passwordRef.current.value); // Copy text

      toast.success("Password Copied !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-zinc-900 bg-gray-800 ">
      <h1 className="text-white text-center font-black  text-2xl">Password Generator ✨</h1>

      <div className="mt-7 shadow rounded-2xl overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          ref={passwordRef} // Attach ref here
          className="outline-none w-full py-1 px-3 bg-white"
          placeholder="Password"
          readOnly
        />
        <button
          className="outline-none bg-blue-700 text-white px-2 py-2 shrink-0 w-full"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2 text-amber-500">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
