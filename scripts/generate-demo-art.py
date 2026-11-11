# Creates original illustrated SVG demo thumbnails; no external assets or licenses needed.
from pathlib import Path
import random, math, json
P=Path(__file__).resolve().parent.parent
OUT=P/'public/images/assets'; OUT.mkdir(parents=True,exist_ok=True)
ART=[
 ('fantasy-village','village','#120d37','#8f52d8','#f9a96b'),
 ('sci-fi-hangar','scifi','#071728','#1264a3','#28e2d4'),
 ('stylized-knight','knight','#271126','#963c63','#ffc883'),
 ('cyber-drone','drone','#071a2a','#2852a0','#51f9eb'),
 ('forest-parallax','forest','#17213f','#ae4d88','#f2c077'),
 ('pixel-ui','ui','#171328','#6142aa','#fc82a8'),
 ('ambient-soundscapes','audio','#0b1b32','#117b91','#79f9d5'),
 ('magic-particles','magic','#210d3e','#7735b8','#ff87d7'),
 ('neon-shaders','orbs','#100d34','#3b37bd','#f482e0'),
 ('third-person-controller','controller','#17223b','#436d9c','#fbb673'),
 ('inventory-system','inventory','#241a2b','#67485d','#ffa56d'),
 ('hologram-ui','holo','#061a27','#176b83','#5cead6'),
 ('desert-outpost','desert','#372134','#aa5b64','#ffc478'),
 ('arcade-sfx','audio2','#1b123b','#673bc4','#ffd16d'),
 ('water-shader','water','#04283a','#137f9b','#79e6f7'),
 ('space-shooter-template','space','#0c1034','#38348b','#fe649d')
]
def circle(x,y,r,fill,opacity=1,more=''):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" {more}/>' if 'opacity=' in more else f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" opacity="{opacity}" {more}/>'
def rect(x,y,w,h,fill,rx=0,more=''):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {more}/>'
def polygon(points,fill,more=''):return f'<polygon points="{points}" fill="{fill}" {more}/>'
def line(x1,y1,x2,y2,color,width=2,opacity=1):return f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{color}" stroke-width="{width}" opacity="{opacity}" fill="none"/>'
def scene(name,kind,a,b,accent):
 random.seed(name)
 o=[]
 o.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">')
 o.append(f'''<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="{a}"/><stop offset=".6" stop-color="{b}"/><stop offset="1" stop-color="{a}"/></linearGradient><radialGradient id="halo"><stop stop-color="{accent}" stop-opacity=".6"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient><linearGradient id="metal" x2="0.7" y2="1"><stop stop-color="{accent}"/><stop offset=".5" stop-color="{b}"/><stop offset="1" stop-color="{a}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="9"/></filter></defs>''')
 o.append(rect(0,0,800,520,'url(#bg)'))
 o.append(circle(550,130,310,'url(#halo)',.76))
 for i in range(36):
  x=random.randint(0,800);y=random.randint(0,520)
  o.append(circle(x,y,random.choice([1,1,2,3]),'#ffffff',round(random.uniform(.07,.35),2)))
 if kind in ('village','scifi','desert','forest','controller','space','water'):
  o.append(circle(600 if kind!='forest' else 280,130,75,accent,.19))
 if kind=='village':
  o += [polygon('0,390 180,215 330,385', '#302253'),polygon('240,345 440,150 650,410','#49306d'),polygon('480,400 680,240 800,345 800,520 0,520','#22183b')]
  o.append(polygon('0,400 400,310 800,405 800,520 0,520','#211c3b'))
  for x,y,s in [(130,312,.9),(260,284,1),(460,265,1.5),(620,325,.75),(350,365,.75)]:
   w,h=65*s,120*s
   o.append(polygon(f'{x},{y} {x+w},{y-14*s} {x+w},{y+h} {x},{y+h+12*s}', '#7d668f'))
   o.append(polygon(f'{x},{y} {x+w/2},{y-50*s} {x+w},{y-14*s}', '#e58b94'))
   o.append(rect(x+15*s,y+35*s,15*s,24*s,accent,2, 'opacity=".85"'))
   o.append(rect(x+40*s,y+40*s,13*s,20*s,'#ffd9ac',2))
  o.append(polygon('0,466 300,390 540,460 800,413 800,520 0,520','#1b1934'))
 elif kind=='scifi':
  o += [polygon('0,250 400,145 800,258 800,520 0,520','#10283d'),polygon('0,320 400,220 800,320 800,520 0,520','#0a2535')]
  for x in [60,150,620,710]:
   o.append(polygon(f'{x},180 {x+60},150 {x+60},400 {x},430','#1a4360'))
   o.append(line(x+25,187,x+25,360,accent,3,.7))
  o += [polygon('0,440 400,340 800,440 800,520 0,520','#17384d'),polygon('250,360 410,260 580,360 510,390 320,390','#1b657e'),polygon('330,295 405,220 480,295','#a1d5de'),polygon('290,363 410,310 540,366 410,410','#0a2a43')]
  for x in [85,205,595,715]:o.append(rect(x,450,34,8,accent,2))
 elif kind=='knight':
  o.append(circle(398,265,185,'#ffcc9a',.10))
  o.append(polygon('0,520 280,450 400,500 530,440 800,520','#1a1225'))
  o.append(polygon('335,250 405,215 470,250 490,434 310,434','#2d263f'))
  o.append(polygon('320,265 380,245 400,385 325,415','#b9a1bc'))
  o.append(polygon('475,250 420,250 409,390 485,413','#a66c8e'))
  o.append(rect(355,164,92,102,'#cbc2cc',26))
  o.append(polygon('347,177 401,105 455,180 435,212 364,211','#ded9d9'))
  o.append(polygon('360,219 440,215 426,244 370,244','#2b273b'))
  o.append(line(401,194,401,231,accent,7))
  o.append(rect(394,290,18,186,accent,5))
  o.append(polygon('390,470 416,470 406,502','#f7d6a5'))
  o.append(circle(401,302,38,'#ead4a8',.1))
 elif kind=='drone':
  for cx,cy in [(245,190),(550,190),(245,370),(550,370)]:
   o.append(circle(cx,cy,66,'none',1,f'stroke="{accent}" stroke-width="9" opacity=".55"'))
   o.append(circle(cx,cy,28,'#144b67'))
   o.append(line(cx-48,cy,cx+48,cy,accent,3,.65))
  o.append(polygon('270,210 405,155 536,210 540,345 405,410 270,345','#0b344a'))
  o.append(polygon('280,215 405,175 529,215 405,289','#398eaa'))
  o.append(polygon('405,289 529,215 530,340 405,405','#113a57'))
  o.append(polygon('280,215 405,289 405,405 280,340','#1b5774'))
  o.append(circle(405,292,36,accent,.9))
 elif kind=='forest':
  for z in range(3):
   fy=315+z*65
   o.append(polygon(f'0,{fy+60} 100,{fy-20} 240,{fy+50} 440,{fy-40} 600,{fy+50} 800,{fy-20} 800,520 0,520', ['#363d58','#2c3651','#14283b'][z]))
   for x in [20,130,260,400,550,690,760]:
    xx=x+random.randint(-25,25)
    height=random.randint(110,210)-z*20
    o.append(polygon(f'{xx},{fy-height} {xx-48},{fy+25} {xx+48},{fy+25}', ['#615474','#344d62','#1b3d4b'][z]))
  o.append(rect(0,490,800,30,'#102634'))
 elif kind=='ui' or kind=='holo':
  edge=accent
  o.append(rect(115,85,570,355,'#111c35' if kind=='ui' else '#062937',22,f'stroke="{edge}" stroke-opacity=".65" stroke-width="3"'))
  o.append(rect(137,104,526,42,'#3d3761' if kind=='ui' else '#105367',9))
  for j in range(3):o.append(circle(157+j*24,125,6,accent,.7))
  o.append(rect(140,166,150,245,'#1c2446' if kind=='ui' else '#0c3947',12))
  for j in range(5):
   o.append(rect(154,185+j*43,119,23,edge,6,f'opacity="{.14+j*.05}"'))
  o.append(rect(305,167,340,105,'#242c54' if kind=='ui' else '#08465c',12))
  for j in range(14):o.append(rect(322+j*22,250-random.randint(18,65),11,random.randint(15,50),accent,3,'opacity=".74"'))
  o.append(rect(305,288,162,125,'#252b55' if kind=='ui' else '#08465c',12))
  o.append(rect(480,288,165,125,'#252b55' if kind=='ui' else '#08465c',12))
  o.append(circle(388,347,38,'none',1,f'stroke="{edge}" stroke-width="12"'))
  o.append(circle(560,350,34,edge,.3))
 elif kind.startswith('audio'):
  colors=[accent,'#c9a4ff','#70e6ff']
  o.append(circle(400,270,185,'none',1,f'stroke="{accent}" stroke-width="3" opacity=".15"'))
  for i in range(55):
   x=84+i*12
   v=abs(math.sin(i*.21)*math.cos(i*.17))*140 + random.randint(12,55)
   if kind=='audio2':v=abs(math.sin(i*.25)+math.sin(i*.45))*90+15
   o.append(rect(x,260-v/2,6,v,colors[i%3],3,f'opacity="{.5+.4*(v/210):.2f}"'))
  o.append(line(75,260,730,260,'#d8efff',2,.15))
  for rr in [120,180,235]:o.append(circle(400,260,rr,'none',1,f'stroke="{accent}" stroke-width="1" opacity=".15"'))
 elif kind=='magic':
  for rad in [80,140,200]:o.append(circle(405,263,rad,'none',1,f'stroke="{accent}" stroke-width="{7 if rad==140 else 2}" opacity=".6"'))
  for i in range(50):
   ang=random.uniform(0,2*math.pi);r=random.uniform(15,260)
   x=405+math.cos(ang)*r;y=260+math.sin(ang)*r*.8
   sz=random.uniform(2,12)
   o.append(circle(x,y,sz,accent,random.uniform(.2,.9)))
  o += [polygon('405,98 445,223 567,263 445,302 405,425 365,302 244,263 365,223', '#fb9ef2', 'opacity=".62"'),circle(405,263,45,'#ffffff',.9)]
 elif kind=='orbs':
  for x,y,r,col in [(225,325,105,'#ee8fc5'),(450,245,145,'#73bff1'),(605,370,80,'#c59dff')]:
   o.append(circle(x,y,r,'url(#metal)'))
   o.append(circle(x-r*.3,y-r*.3,r*.33,'#ffffff',.35))
   o.append(circle(x+r*.2,y+r*.35,r*.5,'#130e42',.26))
  o.append(polygon('0,470 320,420 580,470 800,420 800,520 0,520','#111031'))
 elif kind=='controller':
  o.append(polygon('0,395 405,305 800,394 800,520 0,520','#182d42'))
  for j in range(4):o.append(line(0,400+j*40,800,400+j*40,'#5bb1d4',1,.15))
  o.append(polygon('310,250 398,207 486,250 398,292','#c7d1b2'))
  o.append(polygon('310,250 398,292 398,430 310,380','#547d90'))
  o.append(polygon('398,292 486,250 486,380 398,430','#275268'))
  o.append(circle(400,186,37,'#f3c494'))
  o.append(rect(365,215,70,120,'#ad7070',18))
  o.append(line(367,338,334,426,'#fac697',21))
  o.append(line(430,338,469,427,'#fac697',21))
 elif kind=='inventory':
  o.append(rect(120,60,560,400,'#251d34',22,f'stroke="{accent}" stroke-opacity=".4" stroke-width="3"'))
  o.append(rect(145,87,510,43,'#5f4359',8))
  for row in range(3):
   for col in range(5):
    x=160+col*98;y=158+row*94
    o.append(rect(x,y,79,79,'#483247',10,'stroke="#ba8c91" stroke-opacity=".3"'))
    cx=x+40;cy=y+40
    i=row*5+col
    if i%4==0:o.append(polygon(f'{cx},{cy-28} {cx+20},{cy} {cx},{cy+26} {cx-20},{cy}',accent,'opacity=".8"'))
    elif i%4==1:o.append(circle(cx,cy,23,'#9b73a7'))
    elif i%4==2:o.append(rect(cx-19,cy-23,38,46,'#c18c6b',5))
    else:o.append(polygon(f'{cx-23},{cy+13} {cx},{cy-25} {cx+23},{cy+13}', '#bcb6cf'))
 elif kind=='desert':
  o.append(polygon('0,345 135,260 250,325 380,224 570,300 800,205 800,520 0,520','#934e59'))
  o.append(polygon('0,430 170,350 320,395 520,325 800,390 800,520 0,520','#d07a65'))
  o.append(polygon('0,480 300,415 590,478 800,437 800,520 0,520','#a15f60'))
  o.append(rect(290,225,175,180,'#68485a',8)); o.append(rect(325,173,105,65,'#765065',8))
  o.append(polygon('282,225 380,153 478,225','#ddb08e'))
  for x in [310,375,440]:o.append(rect(x,283,19,40,accent,2))
 elif kind=='water':
  o.append(polygon('0,295 150,235 300,286 445,223 650,298 800,260 800,520 0,520','#103b56'))
  for j in range(8):
   y=305+j*32
   d=' '.join(f'{x},{y+math.sin(x*.022+j)*10:.1f}' for x in range(0,801,25))
   o.append(f'<polyline points="{d}" fill="none" stroke="{accent}" opacity="{.65-j*.055}" stroke-width="3"/>')
  o.append(circle(530,175,68,'#ffffff',.16))
 elif kind=='space':
  for i in range(26):
   x=random.randint(0,800);y=random.randint(0,520)
   o.append(line(x,y,x+random.randint(-20,20),y+random.randint(25,65),'#ffffff',1,.23))
  o.append(polygon('400,100 495,340 430,315 400,385 370,315 305,340','#e3afdf'))
  o.append(polygon('400,100 432,315 400,270 368,315','#8ecbff'))
  o.append(polygon('383,347 400,448 417,347','#ffaf7e'))
  for x,y in [(130,200),(620,340),(700,135)]:o.append(polygon(f'{x},{y-24} {x+24},{y} {x},{y+24} {x-24},{y}',accent,'opacity=".6"'))
 # vignette
 o.append('<rect width="800" height="520" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width="6"/>')
 o.append('</svg>')
 (OUT/f'{name}.svg').write_text(''.join(o),encoding='utf-8')
for art in ART:scene(*art)
print('Generated',len(ART),'original SVG thumbnails')
