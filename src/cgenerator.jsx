import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function Cgenerator() {
  const [length,setlength] = useState(8)
  const [numberAllowed,setnumberAllowed] = useState(true)
  const [characterAllowed,setcharacterAllowed] = useState(true)
  const [password,setpassword] = useState("")
  const passwordRef = useRef(null)

  const generatePassword =useCallback(() => {
    let pass =""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdedghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(characterAllowed) str += "!@#$%^&*()_+}|{[]"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setpassword(pass)
  },[length,numberAllowed,characterAllowed,setpassword])
  useEffect( () => {
    generatePassword()
  },[length,numberAllowed,setpassword,characterAllowed])
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)

  },[password])
 



  return (
     <div className="w-full h-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-16  bg-[#005f73]">
      <h1 className='text-[#fca311] text-center text-3xl my-5'>PASSWORD GENERATOR</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
            type="text"
            value={password}
            className="outline-none bg-[#e5e5e5] w-full py-1 px-3 text-[#000000]"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-[#000000] text-[#fca311] px-3 py-0.5 shrink-0 text-1xl'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2 mb-5'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => setlength(e.target.value)}
          />
          <label className='text-[#fca311] '>Length : {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          className="cursor-pointer"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setnumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput" className='text-[#fca311]'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setcharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput" className='text-[#fca311]'>Characters</label>
      </div>
    </div>
</div>

  )
}

export default Cgenerator