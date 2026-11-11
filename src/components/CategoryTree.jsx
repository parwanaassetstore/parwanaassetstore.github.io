import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'

// Clicking a category name always opens its own listing page.
// Clicking the small arrow only opens/closes its children.
export function CategoryTreeItem({node, depth = 0, defaultExpanded = false, onNavigate}) {
  const hasChildren = Boolean(node.children?.length)
  const [expanded, setExpanded] = useState(defaultExpanded && hasChildren)
  return <div className="min-w-0">
    <div className="category-tree-line flex items-center min-w-0 gap-1 rounded-lg hover:bg-white/[.055] transition group">
      {hasChildren ? <button type="button" onClick={() => setExpanded(v => !v)} aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.name}`} aria-expanded={expanded} className="h-8 w-8 shrink-0 rounded-lg grid place-items-center text-[#9b97b0] hover:text-white hover:bg-white/10">
        {expanded ? <ChevronDown size={15}/> : <ChevronRight size={15}/>}
      </button> : <span className="h-8 w-8 shrink-0 grid place-items-center text-[#67657c]"><Folder size={13}/></span>}
      <Link to={`/category/${node.slug}`} onClick={onNavigate} className="flex-1 min-w-0 py-2 pr-2 text-[13px] text-[#c4c0d4] group-hover:text-white hover:!text-[#bcacff] leading-snug">{node.name}</Link>
    </div>
    {hasChildren && expanded && <div className="ml-4 pl-2 border-l border-white/[.09]">
      {node.children.map(child => <CategoryTreeItem key={child.slug} node={child} depth={depth+1} defaultExpanded={defaultExpanded} onNavigate={onNavigate}/>) }
    </div>}
  </div>
}

export default function CategoryTree({items, defaultExpanded = false, onNavigate}) {
  return <div className="flex flex-col gap-0.5">{items.map(node=><CategoryTreeItem key={node.slug} node={node} defaultExpanded={defaultExpanded} onNavigate={onNavigate}/>)}</div>
}
