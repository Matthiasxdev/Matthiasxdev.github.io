
import {  useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState } from 'react'
import "./Projects.css"
import { NextIcon } from '../svg/next'
import { PrismaIcon } from '../svg/prisma'

export default function Projects(width = 1920) {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    // const { width,  height } = useThree((state) => state.viewport)
    useFrame(() => {
        
        if (display === false && data.range(1/2, 1 / 2) > 0){
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
                        <h3>CoolSquad</h3>
                        <p>A marketplace website build with Next.js</p>
                        <div className='tags'>
                            <span className='tag'><NextIcon/>Next.js</span>
                            <span className='tag'><PrismaIcon/>Next.js</span>
                        </div>
                    </div>
                    <div className='card box__bg'>
                        <h3>FreeCodeCamp</h3>
                        <p>An educationnal plateform where I've been learning how to start coding modern web</p>
                    </div>
                    <div className='card box__bg'>
                        <h3>Stay tuned</h3>
                        <p>More complete projects coming (React Native)</p>
                    </div>
                </div>
            </div>
            :
            false
            }
        </>
    )
  }