import { format, formatDistanceToNow } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
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
  );

const CollectionPreview = ({
  id,
  name,
  entries=[],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {

  if(isCreateNew){
    return <button 
    onClick={onCreateNew}
    className="relative group h-[200px] cursor-pointer">
      <FolderTab colorClass={colorSchemes["createCollection"].bg}/>
      <div className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes["createCollection"].tab}`}>
        <div className="h-12 w-12 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center">
          <Plus className="h-6 w-6 text-gray-600"/>
        </div>
          <p className="text-gray-600 font-medium">Create New Collection</p>
      </div>
    </button>
  }
  return (
    <Link 
      href={`/collection/${isUnorganized? "unorganized" : id}`}
      className="group relative"
    >
      <FolderTab 
        colorClass={
          colorSchemes[isUnorganized? "unorganized" : "collection"].tab
          }
      />
      <div
        className={`relative rounded-lg p-6 shadow-md hover:shadow-lg transition-all ${
          colorSchemes[isUnorganized ? "unorganized" : "collection"].bg 
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{isUnorganized? "📂" : "📁"}</span>
          <h3 className="text-lg font-semibold truncate">{name}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{entries.length} entries</span>
            {entries.length > 0 && (
              <span>
                {formatDistanceToNow(new Date(entries[0].createdAt),{
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionPreview