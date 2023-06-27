
import { MoonIcon } from "../svg/moon"
import { SunIcon } from "../svg/sun"
import "./Switch.css"

export const Switch = ({handleThemeChange, theme}) => {
    
  return (
    <>
    <input type="checkbox" id="darkmode-toggle" onChange={handleThemeChange} defaultChecked={theme === 'dark'}/>
    <label for="darkmode-toggle" >
      {/* <SunIcon/>
      <MoonIcon/> */}
    </label>
    {/* <button 
    className='switch-dark-light'
    onClick={handleThemeChange}
    >
        <div className="switch-frame"></div>
        <MoonIcon/>
        <SunIcon/>
    </button> */}
    </>
  )
}
