
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

export default function Skills({width}) {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    let range = 1/3;
    if (width <= 700) {
        range = 1/4;
    }else if(width < 1300){
        range = 1/4;
    }
    // const { width,  height } = useThree((state) => state.viewport)
    useFrame(() => {
        
        if (display === false && data.range(range, range) > 0){
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
                            <li><ReactIcon gradient={true}/>react</li>
                            <li><TypescriptIcon/>typescript</li>
                            <li><ThreeIcon/>three.js</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Back-end</h4>
                        <ul>
                            <li><PostgresqlIcon/>postgreSQL</li>
                            <li><PrismaIcon gradient={true}/>prisma</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Others</h4>
                        <ul>
                            <li><GithubIcon gradient={true}/>git&github</li>
                            <li><NextIcon gradient={true}/>next.js</li>
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