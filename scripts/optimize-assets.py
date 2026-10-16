from pathlib import Path
import sys
sys.path.insert(0,str(Path('tmp/font-subset').resolve()))
from fontTools import subset
from fontTools.ttLib import TTFont
from PIL import Image

assets=Path('public/assets')
unicodes=list(range(0x20,0x250))+list(range(0x400,0x530))+list(range(0x2000,0x2070))+[0x20ac]
for name in ['lunchbox.ttf']+[f'nunito-{i}.woff2' for i in range(6)]:
    font=TTFont(assets/name)
    options=subset.Options()
    options.layout_features=['*']
    sub=subset.Subsetter(options=options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    font.flavor='woff2'
    output=assets/('lunchbox.woff2' if name=='lunchbox.ttf' else name)
    font.save(output)
    print(output.name,output.stat().st_size)
for name in ['park','matka','museum']:
    im=Image.open(assets/(name+'.jpg')).convert('RGB')
    im.thumbnail((1400,1100))
    im.save(assets/(name+'.webp'),'WEBP',quality=78,method=6)
css=(assets/'fonts.css').read_text().replace("format('truetype')","format('woff2')")
(assets/'fonts.css').write_text(css)
css=Path('public/styles.css').read_text(encoding='utf8').replace("assets/lunchbox.ttf') format('truetype')","assets/lunchbox.woff2') format('woff2')")
Path('public/styles.css').write_text(css,encoding='utf8')
