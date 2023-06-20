
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

export default function Skills() {
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
            <div className='skills animate-translate'>
                <h3 className='gradient-text-skills'>Skills</h3>
                <div className='tabs'>
                    <div>
                        <h4>Front-end</h4>
                        <ul>
                            <li><ReactIcon/>react</li>
                            <li><TypescriptIcon/>typescript</li>
                            <li><ThreeIcon/>three.js</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Back-end</h4>
                        <ul>
                            <li><PostgresqlIcon/>postgreSQL</li>
                            <li><PrismaIcon/>prisma</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Others</h4>
                        <ul>
                            <li><GithubIcon gradient={true}/>git&github</li>
                            <li><NextIcon/>next.js</li>
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