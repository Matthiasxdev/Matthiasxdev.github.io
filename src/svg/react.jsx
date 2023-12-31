


export const ReactIcon = ({gradient = false, darkmode = false}) => {
    return (

        <>
        {gradient ?

            darkmode ? 
            
            <svg xmlns="http://www.w3.org/2000/svg"  width="35px" height="35px" viewBox="0 0 80 80" stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#fff" fillRule="evenodd">
                <defs>
                    <linearGradient id="A" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F9ED69"/>
                        <stop offset="100%" stopColor="#F08A5D"/>
                    </linearGradient>
                    <path id="reactIcon" d="M0 15.2126C0 6.7849 16.5196 0 37.0393 0s37.0395 6.7849 37.0395 15.2126-16.5196 15.2126-37.0395 15.2126S0 23.6404 0 15.2126zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S55.727 27.1181 37.0393 27.1181 3.3071 21.8082 3.3071 15.2126z"/>
                    
                </defs>
                <g fill="url(#A)" stroke="none">
                    <circle cx="39.6227" cy="39.6358" r="6.6362"/>
                    <path d="M2.6457 39.6851c0-8.4277 16.5196-15.2126 37.0393-15.2126s37.0395 6.7849 37.0395 15.2126S60.2049 54.8977 39.685 54.8977 2.6457 48.1129 2.6457 39.6851zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S58.3727 51.5906 39.685 51.5906 5.9528 46.2807 5.9528 39.6851z"/>
                    <use xlinkHref="#reactIcon" transform="matrix(.5 .8660254 -.8660254 .5 34.34019806 .00313866)"/>
                    <use xlinkHref="#reactIcon" transform="matrix(-.5 .8660254 -.8660254 -.5 71.37959806 15.21573866)"/>
                </g>
            </svg>

            :

            
            <svg xmlns="http://www.w3.org/2000/svg"  width="35px" height="35px" viewBox="0 0 80 80" stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#fff" fillRule="evenodd">
                <defs>
                    <linearGradient id="A" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F08A5D"/>
                        <stop offset="100%" stopColor="#B83B5E"/>
                    </linearGradient>
                    <path id="reactIcon" d="M0 15.2126C0 6.7849 16.5196 0 37.0393 0s37.0395 6.7849 37.0395 15.2126-16.5196 15.2126-37.0395 15.2126S0 23.6404 0 15.2126zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S55.727 27.1181 37.0393 27.1181 3.3071 21.8082 3.3071 15.2126z"/>
                    
                </defs>
                <g fill="url(#A)" stroke="none">
                    <circle cx="39.6227" cy="39.6358" r="6.6362"/>
                    <path d="M2.6457 39.6851c0-8.4277 16.5196-15.2126 37.0393-15.2126s37.0395 6.7849 37.0395 15.2126S60.2049 54.8977 39.685 54.8977 2.6457 48.1129 2.6457 39.6851zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S58.3727 51.5906 39.685 51.5906 5.9528 46.2807 5.9528 39.6851z"/>
                    <use xlinkHref="#reactIcon" transform="matrix(.5 .8660254 -.8660254 .5 34.34019806 .00313866)"/>
                    <use xlinkHref="#reactIcon" transform="matrix(-.5 .8660254 -.8660254 -.5 71.37959806 15.21573866)"/>
                </g>
            </svg>


        :
        
        <svg xmlns="http://www.w3.org/2000/svg"  width="35px" height="35px" viewBox="0 0 80 80" stroke="#000" strokeLinecap="round" strokeLinejoin="round" fill="#fff" fillRule="evenodd">
            <defs>
                <path id="reactIcon" d="M0 15.2126C0 6.7849 16.5196 0 37.0393 0s37.0395 6.7849 37.0395 15.2126-16.5196 15.2126-37.0395 15.2126S0 23.6404 0 15.2126zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S55.727 27.1181 37.0393 27.1181 3.3071 21.8082 3.3071 15.2126z"/>
            </defs>
            <g stroke="none">
                <circle cx="39.6227" cy="39.6358" r="6.6362"/>
                <path d="M2.6457 39.6851c0-8.4277 16.5196-15.2126 37.0393-15.2126s37.0395 6.7849 37.0395 15.2126S60.2049 54.8977 39.685 54.8977 2.6457 48.1129 2.6457 39.6851zm3.3071 0c0-6.5957 15.0446-11.9055 33.7322-11.9055s33.7323 5.3098 33.7323 11.9055S58.3727 51.5906 39.685 51.5906 5.9528 46.2807 5.9528 39.6851z"/>
                <use xlinkHref="#reactIcon" transform="matrix(.5 .8660254 -.8660254 .5 34.34019806 .00313866)"/>
                <use xlinkHref="#reactIcon" transform="matrix(-.5 .8660254 -.8660254 -.5 71.37959806 15.21573866)"/>
            </g>
        </svg>
        }
        </>

    )
  }

 
  
  

  

