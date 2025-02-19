"use client"

import type React from "react"
import { useState } from "react"

interface MapBoxProps {
  onLocationSelect: (location: { address: string; mapCoordinates: { latitude: number; longitude: number } }) => void
}

const MapBox: React.FC<MapBoxProps> = ({ onLocationSelect }) => {
  const [address, setAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would use a geocoding service to get coordinates
    onLocationSelect({
      address,
      mapCoordinates: {
        latitude: 0,
        longitude: 0,
      },
    })
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address, state or suburb"
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Set Location
        </button>
      </form>
      <p className="mt-2 text-sm text-gray-600">Don't worry, you can always adjust this later</p>
      <div className="mt-4 bg-gray-200 h-64 flex items-center justify-center">
        <p>Map placeholder (integrate with real map service)</p>
      </div>
    </div>
  )
}

export default MapBox

