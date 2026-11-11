import { Box, Brush, Music2, WandSparkles, Wrench, Blocks, Sparkles, Layers, Gamepad2 } from 'lucide-react'

export const categories = [
  { slug:'3d', name:'3D Models', short:'Characters, props & worlds', Icon:Box, tint:'#9667ff' },
  { slug:'2d', name:'2D Assets', short:'Sprites, icons & UI', Icon:Brush, tint:'#fb76a8' },
  { slug:'audio', name:'Audio', short:'Music, SFX & ambience', Icon:Music2, tint:'#4acfd1' },
  { slug:'vfx', name:'VFX', short:'Particles & effects', Icon:WandSparkles, tint:'#fda75d' },
  { slug:'tools', name:'Tools', short:'Build faster', Icon:Wrench, tint:'#75aaff' },
  { slug:'templates', name:'Templates', short:'Ready-to-use projects', Icon:Blocks, tint:'#a2e48b' },
  { slug:'shaders', name:'Shaders', short:'Materials & lighting', Icon:Sparkles, tint:'#d588f7' },
  { slug:'ui', name:'UI Kits', short:'Interfaces & HUDs', Icon:Layers, tint:'#ef9a72' },
  { slug:'games', name:'Game Systems', short:'Controllers & gameplay', Icon:Gamepad2, tint:'#e4ca77' }
]
export const categoryBySlug = Object.fromEntries(categories.map(item => [item.slug,item]))
