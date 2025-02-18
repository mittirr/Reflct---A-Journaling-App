import React from 'react'

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
  

  const FolderTab = ({colorClass}) => (
    <div className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
    />
  )
const CollectionPreview = ({
  id,
  name,
  entries=[],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {

  if(isCreateNew){
    return <button>
      <FolderTab/>
    </button>
  }
  return (
    <div>CollectionPreview</div>
  )
}

export default CollectionPreview