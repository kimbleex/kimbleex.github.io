import os
from PIL import Image    # Pillow                    9.0.0
import pillow_avif       # pillow-avif-plugin        1.2.2
#以上只是其中一个可用版本，并非必须
#必须先安装pip install pillow-avif-plugin才能使用

# AVIFfilename = 'test.avif'
# AVIFimg = Image.open(AVIFfilename)
# AVIFimg.save(AVIFfilename.replace("avif",'jpg'),'JPEG')
# #也可以是png等任意格式，但是转换的png有点大

# path = ["./Cover_unused/"]
# for i in os.listdir(path[0]):
    
# path_ = path[0] + i
# ===========================
# path_ = r"./With_CRZ\schoolFinal\cover.jpg"
# img = Image.open(path_)
# img.save(path_.replace("jpg",'avif'),'AVIF')

# ============================

path = "./With_CRZ/schoolFinal/"
files = os.listdir(path)
for i in files:
    if i.endswith(".jpg"):
        img = Image.open(path + i)
        img.save(path + i.replace("jpg",'avif'),'AVIF')
