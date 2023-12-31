
import {  useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState , useContext} from 'react'
import "./Projects.css"
import { NextIcon } from '../svg/next'
import { PrismaIcon } from '../svg/prisma'
import { ReactIcon } from '../svg/react'
import { FCCIcon } from '../svg/freecodecamp'
import { CoolSquadIcon } from '../svg/coolsquad'
import {  } from 'react'
import { ThemeContext } from '../contexts/theme-context'

export default function Projects({width, theme }) {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    
    let range = 1/3;
    if (width <= 700) {
        range = 1/4;
    }else if(width < 1300){
        range = 1/4;
    }
    useFrame(() => {
        
        if (display === false && data.range(range, range) > 0){
            setDisplay(true)
        }
    })
    return (
        <>
            {display ?
            <div className={`animate-translate projects${theme === 'dark' ? '-dark' : ''}`}>
                <h3 className={`gradient-text-projects${theme === 'dark' ? '-dark' : ''}`}>Projects</h3>
                <div className='cards'>
                    <button className={`card${theme === 'dark' ? '-dark' : ''}  box__bg${theme === 'dark' ? '-dark' : ''}`}>
                        <a href="https://coolsquad.vercel.app/" target='blank'> 
                            <div className='header_card'><CoolSquadIcon/><h4>CoolSquad</h4></div>
                            <p>CoolSquad is a Saas build with Next.js. It connects professionals in the world of events.
                            It works like a market place, where suppliers offer their services and products on the site, and where potential customers can access a wide range of choices according to several themes, cities and other criteria.</p>
                            <div className='tags'>
                                <div className={`tag${theme === 'dark' ? '-dark' : ''}`}><NextIcon/>Next.js</div>
                                <div className={`tag${theme === 'dark' ? '-dark' : ''}`}><PrismaIcon/>Prisma</div>
                            </div>
                        </a>
                    </button>
                    <button className={`card${theme === 'dark' ? '-dark' : ''}  box__bg${theme === 'dark' ? '-dark' : ''}`}>
                        <a href="https://www.freecodecamp.org/Matthiasxdev" target='blank'> 
                            <div className='header_card'><h4>FreeCodeCamp</h4><FCCIcon/></div>
                            <p>FreeCodeCamp is an educational platform where I learned to code modern web applications. 
                            You can check out the certifications I've earned on this site and some of the projects I've completed for learning purposes. </p>
                            <div className='tags'>
                                <div className='tag'><ReactIcon/>React</div>
                            </div>
                        </a>
                    </button>
                    <button className={`card${theme === 'dark' ? '-dark' : ''}  box__bg${theme === 'dark' ? '-dark' : ''}`}>
                    <a href="/"> 
                        <div className='header_card'><h4>Stay tuned</h4></div>
                        <p>More projects coming...</p>
                        <div className='tags'>
                            <div className='tag'><ReactIcon/>React Native</div>
                        </div>
                    </a> 
                    </button>
                </div>
            </div>
            :
            <div className='block-display-none'></div>
            }
        </>
    )
  }