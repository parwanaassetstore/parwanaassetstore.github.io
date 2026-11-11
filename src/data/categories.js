import { Box, Brush, Music2, Wrench, WandSparkles, Blocks, Puzzle, Copyright } from 'lucide-react'

// One shared hierarchy powers the header, homepage, browse filters and category pages.
const rawTree = [
  {
    "name": "3D",
    "slug": "3d",
    "children": [
      {
        "name": "Animations",
        "slug": "3d/animations",
        "children": []
      },
      {
        "name": "Characters",
        "slug": "3d/characters",
        "children": [
          {
            "name": "Animals",
            "slug": "3d/characters/animals",
            "children": [
              {
                "name": "Birds",
                "slug": "3d/characters/animals/birds",
                "children": []
              },
              {
                "name": "Fish",
                "slug": "3d/characters/animals/fish",
                "children": []
              },
              {
                "name": "Insects",
                "slug": "3d/characters/animals/insects",
                "children": []
              },
              {
                "name": "Mammals",
                "slug": "3d/characters/animals/mammals",
                "children": []
              },
              {
                "name": "Reptiles",
                "slug": "3d/characters/animals/reptiles",
                "children": []
              }
            ]
          },
          {
            "name": "Creatures",
            "slug": "3d/characters/creatures",
            "children": []
          },
          {
            "name": "Humanoids",
            "slug": "3d/characters/humanoids",
            "children": [
              {
                "name": "Fantasy",
                "slug": "3d/characters/humanoids/fantasy",
                "children": []
              },
              {
                "name": "Humans",
                "slug": "3d/characters/humanoids/humans",
                "children": []
              },
              {
                "name": "Sci-Fi",
                "slug": "3d/characters/humanoids/sci-fi",
                "children": []
              }
            ]
          },
          {
            "name": "Robots",
            "slug": "3d/characters/robots",
            "children": []
          }
        ]
      },
      {
        "name": "Environments",
        "slug": "3d/environments",
        "children": [
          {
            "name": "Dungeons",
            "slug": "3d/environments/dungeons",
            "children": []
          },
          {
            "name": "Fantasy",
            "slug": "3d/environments/fantasy",
            "children": []
          },
          {
            "name": "Historic",
            "slug": "3d/environments/historic",
            "children": []
          },
          {
            "name": "Industrial",
            "slug": "3d/environments/industrial",
            "children": []
          },
          {
            "name": "Landscapes",
            "slug": "3d/environments/landscapes",
            "children": []
          },
          {
            "name": "Roadways",
            "slug": "3d/environments/roadways",
            "children": []
          },
          {
            "name": "Sci-Fi",
            "slug": "3d/environments/sci-fi",
            "children": []
          },
          {
            "name": "Urban",
            "slug": "3d/environments/urban",
            "children": []
          }
        ]
      },
      {
        "name": "GUI",
        "slug": "3d/gui",
        "children": []
      },
      {
        "name": "Props",
        "slug": "3d/props",
        "children": [
          {
            "name": "Clothing",
            "slug": "3d/props/clothing",
            "children": [
              {
                "name": "Accessories",
                "slug": "3d/props/clothing/accessories",
                "children": []
              },
              {
                "name": "Armor",
                "slug": "3d/props/clothing/armor",
                "children": []
              }
            ]
          },
          {
            "name": "Electronics",
            "slug": "3d/props/electronics",
            "children": []
          },
          {
            "name": "Exterior",
            "slug": "3d/props/exterior",
            "children": []
          },
          {
            "name": "Food",
            "slug": "3d/props/food",
            "children": []
          },
          {
            "name": "Furniture",
            "slug": "3d/props/furniture",
            "children": []
          },
          {
            "name": "Guns",
            "slug": "3d/props/guns",
            "children": []
          },
          {
            "name": "Industrial",
            "slug": "3d/props/industrial",
            "children": []
          },
          {
            "name": "Interior",
            "slug": "3d/props/interior",
            "children": []
          },
          {
            "name": "Tools",
            "slug": "3d/props/tools",
            "children": []
          },
          {
            "name": "Weapons",
            "slug": "3d/props/weapons",
            "children": []
          }
        ]
      },
      {
        "name": "Vegetation",
        "slug": "3d/vegetation",
        "children": [
          {
            "name": "Flowers",
            "slug": "3d/vegetation/flowers",
            "children": []
          },
          {
            "name": "Plants",
            "slug": "3d/vegetation/plants",
            "children": []
          },
          {
            "name": "Trees",
            "slug": "3d/vegetation/trees",
            "children": []
          }
        ]
      },
      {
        "name": "Vehicles",
        "slug": "3d/vehicles",
        "children": [
          {
            "name": "Air",
            "slug": "3d/vehicles/air",
            "children": []
          },
          {
            "name": "Land",
            "slug": "3d/vehicles/land",
            "children": []
          },
          {
            "name": "Sea",
            "slug": "3d/vehicles/sea",
            "children": []
          },
          {
            "name": "Space",
            "slug": "3d/vehicles/space",
            "children": []
          }
        ]
      }
    ],
    "icon": "Box",
    "tint": "#9672ff",
    "short": "Characters, worlds & props"
  },
  {
    "name": "2D",
    "slug": "2d",
    "children": [
      {
        "name": "Characters",
        "slug": "2d/characters",
        "children": []
      },
      {
        "name": "Environments",
        "slug": "2d/environments",
        "children": []
      },
      {
        "name": "Fonts",
        "slug": "2d/fonts",
        "children": []
      },
      {
        "name": "GUI",
        "slug": "2d/gui",
        "children": [
          {
            "name": "Icons",
            "slug": "2d/gui/icons",
            "children": []
          }
        ]
      },
      {
        "name": "Textures & Materials",
        "slug": "2d/textures-materials",
        "children": [
          {
            "name": "Abstract",
            "slug": "2d/textures-materials/abstract",
            "children": []
          },
          {
            "name": "Brick",
            "slug": "2d/textures-materials/brick",
            "children": []
          },
          {
            "name": "Building",
            "slug": "2d/textures-materials/building",
            "children": []
          },
          {
            "name": "Concrete",
            "slug": "2d/textures-materials/concrete",
            "children": []
          },
          {
            "name": "Fabric",
            "slug": "2d/textures-materials/fabric",
            "children": []
          },
          {
            "name": "Floors",
            "slug": "2d/textures-materials/floors",
            "children": []
          },
          {
            "name": "Food",
            "slug": "2d/textures-materials/food",
            "children": []
          },
          {
            "name": "Metals",
            "slug": "2d/textures-materials/metals",
            "children": []
          },
          {
            "name": "Nature",
            "slug": "2d/textures-materials/nature",
            "children": []
          },
          {
            "name": "Roads",
            "slug": "2d/textures-materials/roads",
            "children": []
          },
          {
            "name": "Roofing",
            "slug": "2d/textures-materials/roofing",
            "children": []
          },
          {
            "name": "Sky",
            "slug": "2d/textures-materials/sky",
            "children": []
          },
          {
            "name": "Stone",
            "slug": "2d/textures-materials/stone",
            "children": []
          },
          {
            "name": "Tiles",
            "slug": "2d/textures-materials/tiles",
            "children": []
          },
          {
            "name": "Water",
            "slug": "2d/textures-materials/water",
            "children": []
          },
          {
            "name": "Wood",
            "slug": "2d/textures-materials/wood",
            "children": []
          }
        ]
      }
    ],
    "icon": "Brush",
    "tint": "#f68eb8",
    "short": "Sprites, art & textures"
  },
  {
    "name": "Audio",
    "slug": "audio",
    "children": [
      {
        "name": "Ambient",
        "slug": "audio/ambient",
        "children": [
          {
            "name": "Fantasy",
            "slug": "audio/ambient/fantasy",
            "children": []
          },
          {
            "name": "Nature",
            "slug": "audio/ambient/nature",
            "children": []
          },
          {
            "name": "Noise",
            "slug": "audio/ambient/noise",
            "children": []
          },
          {
            "name": "Sci-Fi",
            "slug": "audio/ambient/sci-fi",
            "children": []
          },
          {
            "name": "Urban",
            "slug": "audio/ambient/urban",
            "children": []
          }
        ]
      },
      {
        "name": "Music",
        "slug": "audio/music",
        "children": [
          {
            "name": "Electronic",
            "slug": "audio/music/electronic",
            "children": []
          },
          {
            "name": "Orchestral",
            "slug": "audio/music/orchestral",
            "children": []
          },
          {
            "name": "Pop",
            "slug": "audio/music/pop",
            "children": []
          },
          {
            "name": "Rock",
            "slug": "audio/music/rock",
            "children": []
          },
          {
            "name": "World",
            "slug": "audio/music/world",
            "children": []
          }
        ]
      },
      {
        "name": "Sound FX",
        "slug": "audio/sound-fx",
        "children": [
          {
            "name": "Animals",
            "slug": "audio/sound-fx/animals",
            "children": []
          },
          {
            "name": "Creatures",
            "slug": "audio/sound-fx/creatures",
            "children": []
          },
          {
            "name": "Foley",
            "slug": "audio/sound-fx/foley",
            "children": []
          },
          {
            "name": "Transportation",
            "slug": "audio/sound-fx/transportation",
            "children": []
          },
          {
            "name": "Voices",
            "slug": "audio/sound-fx/voices",
            "children": []
          },
          {
            "name": "Weapons",
            "slug": "audio/sound-fx/weapons",
            "children": []
          }
        ]
      }
    ],
    "icon": "Music2",
    "tint": "#5fced9",
    "short": "Music, ambient & sound FX"
  },
  {
    "name": "Tools",
    "slug": "tools",
    "children": [
      {
        "name": "AI / ML Integration",
        "slug": "tools/ai-ml-integration",
        "children": []
      },
      {
        "name": "Animation",
        "slug": "tools/animation",
        "children": []
      },
      {
        "name": "Audio",
        "slug": "tools/audio",
        "children": []
      },
      {
        "name": "Behavior AI",
        "slug": "tools/behavior-ai",
        "children": []
      },
      {
        "name": "Camera",
        "slug": "tools/camera",
        "children": []
      },
      {
        "name": "Game Toolkits",
        "slug": "tools/game-toolkits",
        "children": []
      },
      {
        "name": "Generative AI",
        "slug": "tools/generative-ai",
        "children": []
      },
      {
        "name": "GUI",
        "slug": "tools/gui",
        "children": []
      },
      {
        "name": "Input Management",
        "slug": "tools/input-management",
        "children": []
      },
      {
        "name": "Integration",
        "slug": "tools/integration",
        "children": []
      },
      {
        "name": "Level Design",
        "slug": "tools/level-design",
        "children": []
      },
      {
        "name": "Localization",
        "slug": "tools/localization",
        "children": []
      },
      {
        "name": "Modeling",
        "slug": "tools/modeling",
        "children": []
      },
      {
        "name": "Network",
        "slug": "tools/network",
        "children": []
      },
      {
        "name": "Painting",
        "slug": "tools/painting",
        "children": []
      },
      {
        "name": "Particles & Effects",
        "slug": "tools/particles-effects",
        "children": []
      },
      {
        "name": "Physics",
        "slug": "tools/physics",
        "children": []
      },
      {
        "name": "Sprite Management",
        "slug": "tools/sprite-management",
        "children": []
      },
      {
        "name": "Terrain",
        "slug": "tools/terrain",
        "children": []
      },
      {
        "name": "Utilities",
        "slug": "tools/utilities",
        "children": []
      },
      {
        "name": "Version Control",
        "slug": "tools/version-control",
        "children": []
      },
      {
        "name": "Video",
        "slug": "tools/video",
        "children": []
      },
      {
        "name": "Visual Scripting",
        "slug": "tools/visual-scripting",
        "children": []
      }
    ],
    "icon": "Wrench",
    "tint": "#7ca9ff",
    "short": "Scripts and game tools"
  },
  {
    "name": "VFX",
    "slug": "vfx",
    "children": [
      {
        "name": "Particles",
        "slug": "vfx/particles",
        "children": [
          {
            "name": "Environment",
            "slug": "vfx/particles/environment",
            "children": []
          },
          {
            "name": "Fire Explosions",
            "slug": "vfx/particles/fire-explosions",
            "children": []
          },
          {
            "name": "Spells",
            "slug": "vfx/particles/spells",
            "children": []
          }
        ]
      },
      {
        "name": "Shaders",
        "slug": "vfx/shaders",
        "children": [
          {
            "name": "DirectX 11",
            "slug": "vfx/shaders/directx-11",
            "children": []
          },
          {
            "name": "Fullscreen Camera Effects",
            "slug": "vfx/shaders/fullscreen-camera-effects",
            "children": []
          },
          {
            "name": "Substances",
            "slug": "vfx/shaders/substances",
            "children": []
          }
        ]
      }
    ],
    "icon": "WandSparkles",
    "tint": "#e7a764",
    "short": "Particles & shaders"
  },
  {
    "name": "Templates",
    "slug": "templates",
    "children": [
      {
        "name": "Packs",
        "slug": "templates/packs",
        "children": []
      },
      {
        "name": "Systems",
        "slug": "templates/systems",
        "children": []
      },
      {
        "name": "Tutorials",
        "slug": "templates/tutorials",
        "children": []
      }
    ],
    "icon": "Blocks",
    "tint": "#95d49b",
    "short": "Packs, systems & tutorials"
  },
  {
    "name": "SDKs",
    "slug": "sdks",
    "children": [],
    "icon": "Puzzle",
    "tint": "#d39cfa",
    "short": "Software development kits"
  }
]

// Reuse the entire existing category hierarchy inside Copyrighted; no second manual tree.
const cloneAsCopyrighted = (node) => ({
  ...node,
  slug: `copyrighted/${node.slug}`,
  children: (node.children || []).map(cloneAsCopyrighted)
})
const copyrightedRoot = {
  name: 'Copyrighted', slug: 'copyrighted', icon: 'Copyright',
  tint: '#f3a4b2', short: 'Copyrighted asset directory',
  children: rawTree.map(cloneAsCopyrighted)
}
const icons = { Box, Brush, Music2, Wrench, WandSparkles, Blocks, Puzzle, Copyright }
export const categories = [...rawTree, copyrightedRoot].map(node => ({...node, Icon: icons[node.icon]}))
const flatten = (items, depth = 0, parent = null) => items.flatMap(item => [
  {...item, depth, parent}, ...flatten(item.children || [], depth + 1, item.slug)
])
export const allCategories = flatten(categories)
export const categoryBySlug = Object.fromEntries(allCategories.map(item => [item.slug, item]))
export const getCategory = slug => categoryBySlug[slug] || null
export const getAncestors = slug => {
  const parts = slug.split('/');
  return parts.map((_, index) => categoryBySlug[parts.slice(0,index+1).join('/')]).filter(Boolean)
}
export const assetMatchesCategory = (assetCategory, target) => !target || assetCategory === target || assetCategory?.startsWith(`${target}/`)
