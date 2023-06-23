import { MoonIcon } from "../svg/moon"
import { SunIcon } from "../svg/sun"
import "./Switch.css"

export const Switch = ({handleThemeChange}) => {
  return (
    
    <button 
    className='switch-dark-light'
    onClick={handleThemeChange}
    >
        <MoonIcon/>
        <SunIcon/>
    </button>
  )
}
