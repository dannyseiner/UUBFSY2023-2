import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div className={""}>
         <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl text-orange-600 font-bold mb-4">Whoops! We've looked everywhere but couldn't find this page.</h1>
        <p className="text-lg mb-4"><span className="text-3xl mr-2">🧐</span> Our best detectives were on the case, but even they came up short.</p>
        <p className="mb-4">Perhaps you were looking for one of these?</p>
        <ul className="list-disc text-left inline-block text-lg mb-6">
            <li>A treasure map (we wish we had one, too).</li>
            <li>The secret formula for eternal happiness (still searching...).</li>
            <li>A page that used to be here but decided to take an unexpected vacation.</li>
        </ul>
        <div>
            <Link to={"/"} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded inline-block mr-2">Return to the Homepage</Link>
            <Link to={"/contact"} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-block">Contact Support</Link>
        </div>
    </div>
    </div>
  )
}
