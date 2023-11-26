import React from 'react'
import LoopIcon from '@mui/icons-material/Loop';

export default function Loader() {
  return (
    <div className={"w-full h-screen bg-gray-400 bg-opacity-80 flex items-center justify-center fixed top-0 left-0"}>
        <LoopIcon className={"text-orange-400 animate-spin"} sx={{fontSize:"150px"}}/>
    </div>
  )
}
