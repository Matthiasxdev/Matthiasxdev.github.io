
import {  useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState } from 'react'
import "./Projects.css"
import { NextIcon } from '../svg/next'
import { PrismaIcon } from '../svg/prisma'
import { ReactIcon } from '../svg/react'

export default function Projects(width = 1920) {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    // const { width,  height } = useThree((state) => state.viewport)
    let range = 1/2;
    if (width <= 700) {
        range = 1/4;
    }else if(width < 1300){
        range = 1/4;
    }
    useFrame(() => {
        
        if (display === false && data.range(range, 0) > 0){
            setDisplay(true)
        }
    })
    return (
        <>
            {display ?
            <div className='projects animate-translate'>
                <h3 className='gradient-text-projects'>Projects</h3>
                <div className='cards'>
                    <div className='card box__bg'>
                        <h4>CoolSquad</h4>
                        <p>A marketplace website build with Next.js</p>
                        <div className='tags'>
                            <div className='tag'><NextIcon/>Next.js</div>
                            <div className='tag'><PrismaIcon/>Prisma</div>
                        </div>
                    </div>
                    <div className='card box__bg'>
                        <h4>FreeCodeCamp</h4>
                        <p>An educational plateform where I have been learning how to code modern web app</p>
                        <div className='tags'>
                            <div className='tag'><ReactIcon/>React</div>
                        </div>
                    </div>
                    <div className='card box__bg'>
                        <h4>Stay tuned</h4>
                        <p>More projects coming...</p>
                        <div className='tags'>
                            <div className='tag'><ReactIcon/>React Native</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='block-display-none'></div>
            }
        </>
    )
  }