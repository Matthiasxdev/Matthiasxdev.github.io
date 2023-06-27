
import * as THREE from 'three'
import { Suspense, useState , useContext} from 'react'
import Pyramids from './components/Pyramids'
import Skills from './components/Skills'
import Projects from './components/Projects'
import { Canvas} from '@react-three/fiber'
import { Scroll, Preload, ScrollControls } from '@react-three/drei'
import useWindowDimensions from './hooks/WindowsDimensions'
import { ThemeContext } from './contexts/theme-context'
import { Switch } from './components/Switch'
// https://github.com/vanruesc/postprocessing
// import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

import { GithubIcon } from './svg/github'
import { LinkedinIcon } from './svg/linkedin'
import './App.css'


function Scene({ speed = 1, count = 200, depth = 350}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
  };


  let nbPages = 2.5;
  if (width <= 700) {nbPages = 4.5}
  else if (width < 1310) {nbPages = 3}

  return(

    <Suspense fallback={null}>
     {/* No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution) */}
    <Canvas 
    gl={{ antialias: true, toneMapping: THREE.NoToneMapping }} 
    dpr={[1, 1.5]} 
    camera={{
       position: [0, 0, 10], 
       fov: 20, near: 0.01, 
       far: depth + 15 
    }}>
    <ScrollControls damping={0.2} pages={nbPages} distance={0.4}>
    <Scroll>
      {/* <color attach="background" args={["orange"]} /> */}
      {/* <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="orange" /> */}
      
      <pointLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      <spotLight castShadow intensity={0.2} angle={Math.PI / 7} position={[150, 150, 250]} penumbra={1} shadow-mapSize={2048} />
      {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
      
      <Pyramids speed={speed} count={count} width={width}/>
      
    {/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
        By default threejs will only process objects if they are "seen" by the camera leading 
        to jank as you scroll down. With <Preload> that's solved.  */}
    </Scroll>

    <Scroll html>
      <div className="panel">
      {/* <div className={`panel ${theme === 'dark' && 'dark-theme'}`}> */}
      <Switch handleThemeChange={handleThemeChange} theme={theme}/>
        <div className="layout title">
          {/* <span className={`gradient-text ${theme === 'dark' && 'dark-theme'}`}> */}
          <span className={`gradient-text${theme === 'dark' ? '-dark' : ''}`}>
            <h2><em>Hi,</em></h2>
            <h4>I'm-</h4>
          </span>
          <h1  className={`animate-translate delay-0_5 gradient-text${theme === 'dark' ? '-dark' : ''}`}>
          Matthias Vernette</h1>
          <p>
            <b className={`animate-opacity delay-0_7 job${theme === 'dark' ? '-dark' : ''}`}>
            a Software Engineer. 
            </b>
            <small className='animate-opacity delay-1 '> I have been working for 3 years on desktop softwares, 
            now self-taught for a year in web development. </small> 
          </p>
          <span className='animate-opacity delay-1'>
            <a href="https://github.com/Matthiasxdev" target='blank'>
            <button className={`buttons${theme === 'dark' ? '-dark' : ''}`}><GithubIcon/>Github</button>
            </a>
            <a href="">
            <button className={`buttons${theme === 'dark' ? '-dark' : ''}`}><LinkedinIcon/>Linkedin</button>
            </a>
          </span>
        </div>
      </div>
      <div className="panel">
        <div className="layout">
            <Skills width={width} theme={theme}/>
            <Projects width={width} theme={theme}/>
        </div>
      </div>
      <footer>by Matthiasxdev - 2023</footer>
    </Scroll>
    <Preload />
    </ScrollControls>
    </Canvas>
    </Suspense>
  )

}

function App () {
  const [speed, setSpeed] = useState(1);

  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main>
        <div className={`scene ${theme === 'dark' && 'dark-theme'}`}>
        {/* <div className="scene"> */}
          <Scene speed= {speed} />
        </div>
      </main>
    </ThemeContext.Provider>
    )
}


export default App