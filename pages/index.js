import Head from 'next/head'
import axios from 'axios'
import {useState} from 'react'
import Clima from '../components/Clima'
import Image from 'next/image'


export default function Home() {
  const [city, setCity] = useState(`${process.env.NEXT_PUBLIC_CIUDAD_NAME}`);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`;
  console.log(city);
  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
          });
    setCity('');
    setLoading(false);
  };

  return (
    <div>
      
      <Head>
        <title>El Clima</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          
         <div className = "backimg" >
         <Image 
          src="/clima_1280.webp"
          alt="Weather"
          layout="fill"
          objectFit='cover'
        />
          
         </div>
         <div>
          <h1 class="text-white-400 text-3xl font-bold">
            El Clima
          </h1>
         </div>
         
         
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
      
       <form >
             
        <div>
        <input onChange={(e) => setCity(e.target.value)}   type="text" placeholder='Ingresa tu Ciudad' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        
        </div>

       </form>
        
       <button onClick={fetchWeather} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Buscar Ciudad
            </button>
           
      </div>
      {weather.main && <Clima data={weather} />}
      
    </div>
  )
}
