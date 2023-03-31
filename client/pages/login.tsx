import Input from "@/components/input"
import { useCallback, useState } from "react"

const Login = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggle = useCallback(() => {
    setVariant(current => current === 'login' ? 'register' : 'login')
  }, [])


  return (
   <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-60">
            <div className="px-12 py-5">
                <img src="/images/logo.png" alt="Logo" className="h-12" />
            </div>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
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
                            id="Omail"
                            type="email"
                            value={email}
                            />
                        
                            <Input 
                            label="Password" 
                            onChange={(e:any) => setUsername(e.target.value)} 
                            id="password"
                            type="password"
                            value={password}
                            />
                    </div>
                    <button className="bg-red-600 py-3 text-white text-bold rounded-md w-full mt-10 hover:bg-red-700 transition" >
                    {variant === 'login' ? 'Login' : 'Create an account'}
                    </button>

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

export default Login