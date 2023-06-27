
import {  useFrame} from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState } from 'react'
import { TypescriptIcon } from '../svg/typescript'
import { ReactIcon } from '../svg/react'
import { PrismaIcon } from '../svg/prisma'
import { PostgresqlIcon } from '../svg/postgresql'
import { GithubIcon } from '../svg/github'
import { ThreeIcon } from '../svg/three'
import { NextIcon } from '../svg/next'
import "./Skills.css"

export default function Skills({width, theme}) {
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
            <div className={`animate-translate skills${theme === 'dark' ? '-dark' : ''}`}>
                <h3 className={`gradient-text-skills${theme === 'dark' ? '-dark' : ''}`}>Skills</h3>
                <div className='tabs'>
                    <div>
                        <h4>Front-end</h4>
                        <ul>
                            <li><ReactIcon gradient={true} darkmode={theme === 'dark'}/>react</li>
                            <li><TypescriptIcon darkmode={theme === 'dark'}/>typescript</li>
                            <li><ThreeIcon darkmode={theme === 'dark'}/>three.js</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Back-end</h4>
                        <ul>
                            <li><PostgresqlIcon darkmode={theme === 'dark'}/>postgreSQL</li>
                            <li><PrismaIcon gradient={true} darkmode={theme === 'dark'}/>prisma</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Others</h4>
                        <ul>
                            <li><GithubIcon gradient={true} darkmode={theme === 'dark'}/>git&github</li>
                            <li><NextIcon gradient={true} darkmode={theme === 'dark'}/>next.js</li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            false
            }
        </>
    )
  }