import React from 'react'

const CollectionPreview = () => {

  const colorSchemes = {
    unorganized: {
      bg: "bg-amber-100 hover:bg-amber-50",
      tab: "bg-amber-200 group-hover:bg-amber-300",
    },
    collection: {
      bg: "bg-blue-100 hover:bg-blue-50",
      tab: "bg-blue-200 group-hover:bg-blue-300",
    },
    createCollection: {
      bg: "bg-gray-200 hover:bg-gray-100",
      tab: "bg-gray-100 hover:bg-gray-50",
    },
  };
  
  return (
    <div>CollectionPreview</div>
  )
}

export default CollectionPreview