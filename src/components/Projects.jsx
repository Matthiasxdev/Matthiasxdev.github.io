
import {  useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState } from 'react'
import { Card } from './Card'
import "./Projects.css"

export default function Projects() {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    // const { width,  height } = useThree((state) => state.viewport)
    useFrame(() => {
        
        if (display === false && data.range(1/2, 1 / 4) > 0){
            setDisplay(true)
        }
    })
    return (
        <>
            {display ?
            <div className='skills animate-translate'>
                <h3>Projects</h3>
                <div className='cards'>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            :
            false
            }
        </>
    )
  }