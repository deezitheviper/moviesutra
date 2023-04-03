import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/router";

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';


const Access = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggle = useCallback(() => {
    setVariant(current => current === 'login' ? 'register' : 'login')
  }, [])

  const login = useCallback(async () => {
    try{
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })
      router.push('/')
    } catch (err){
      console.log(err)
    }
  },[])

  const register = useCallback(async () => {
    try{
        await axios.post('/api/register', {email, username, password})
        login()
    }catch (err){
        console.log(err)
    }
  },[email, username, password, login])


  return (
   <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full bg-opacity-60">
            <div className="px-12 py-5">
                <img src="/images/logo.png" alt="Logo" className="h-12" />
            </div>
            <div className="flex justify-center px-3">
                <div className="bg-black bg-opacity-70 md:px-16 py-16 px-5 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-center text-4xl mb-8 font-semibold">
                        {variant === 'login' ? 'Login' : 'Create an account'}
                    </h2>
                    <div className="flex flex-col gap-4">
                    {variant === 'register' && (
                            <Input 
                            label="Username" 
                            onChange={(e:any) => setUsername(e.target.value)} 
                            id="username"
                            type="text"
                            value={username}
                            />
                             )}

                            <Input 
                            label="Email" 
                            onChange={(e:any) => setEmail(e.target.value)} 
                            id="email"
                            type="email"
                            value={email}
                            />
                        
                            <Input 
                            label="Password" 
                            onChange={(e:any) => setPassword(e.target.value)} 
                            id="password"
                            type="password"
                            value={password}
                            />
                    </div>
                    <button  onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white text-bold rounded-md w-full mt-10 hover:bg-red-700 transition" >
                    {variant === 'login' ? 'Login' : 'Create an account'}
                    </button>
                    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                        <div className="w-10 h-10 bg-white 
                        rounded-full flex 
                        items-center justify-center 
                        cursor-pointer hover:opacity-80
                        transition">
                          <FcGoogle/>
                        </div>
                        <div 
                        onClick={() => signIn('github', {callbackUrl: '/'})}
                        className="w-10 h-10 bg-white 
                        rounded-full flex  
                        items-center justify-center 
                        cursor-pointer hover:opacity-80
                        transition">
                          <FaGithub/>
                        </div>
                    </div>
                    <p className="text-neutral-500 mt-12">
                    {variant === 'login' ? 
                       <>
                       First time using MovieSutra? <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggle} >Create an account</span>
                     </>
                    : 
                    <>
                    Already have an account? <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggle} >Login</span>
                  </> 
}
                    </p>
                </div>
            </div>
        </div>
   </div>
  )
}

export default Access