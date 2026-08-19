import React from 'react'

interface MapEmbedProps {
  lat?: number
  lng?: number
  zoom?: number
  height?: number
  label?: string
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  lat = 33.648249,
  lng = 72.9151665,
  zoom = 18,
  height = 320,
  label = 'Hamza Enterprises',
}) => {
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  const openInMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden border border-[#333]"
      style={{ height }}
    >
      <iframe
        title={label}
        src={embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />

      
        href={openInMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 flex items-center gap-1.5 bg-white text-[#1a73e8] text-sm font-medium px-3 py-2 rounded-md shadow-md hover:bg-gray-50 transition-colors"
      
        Open in Maps
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </div>
  )
}

export default MapEmbed