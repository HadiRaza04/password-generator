import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) characters += "!@#$%^&*-_+=[]{}`~"
    if (numAllowed) characters += "0123456789"

    for (let i = 1; i <= length; i++) {
      let oneChar = Math.floor(Math.random() * characters.length + 1);

      pass += characters.charAt(oneChar);
      
    }
    setPassword(pass)
    
  }, [setPassword, length, numAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  let copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])
  return (
    <>
      <div className='bg-gray-700 mt-8 w-[600px] flex flex-col justify-center mx-auto p-5 rounded-3xl'>
        <h1 className='text-white text-4xl'>Password Generator</h1>
        <input 
        className='mt-2 border-hidden outline-none p-2 rounded text-blue-700 font-bold'
        type="text"
        value={password}
        ref={passwordRef}
        readOnly
        />
        <button 
          onClick={copyToClipboard}
          className='mt-2 p-1 text-white bg-black hover:bg-gray-900 transition-all duration-500'>
            Copy
        </button>
        <div className='flex justify-between text-white mt-3'>
          <span>
            <input 
              type="range" 
              id='range' 
              min={10} 
              max={50} 
              className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor='range'>Length: {length}
            </label>
          </span>
          <span>
            <input 
              type="checkbox" 
              id='numInput' 
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numInput'>Number Allowed</label>
          </span>
          <span>
            <input 
              type="checkbox" 
              id='charInput' 
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            /><label htmlFor='charInput'>Character Allowed</label>
          </span>
        </div> 
      </div>
    </>
  )
}

export default App
