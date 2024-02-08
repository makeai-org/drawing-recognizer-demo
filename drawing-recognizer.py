from flask import Flask as fk
from flask import url_for as url_for
from flask import render_template as rt
from flask import request as rq
import tensorflow as tf
import keras as ker
import numpy as np
"""
import PIL
from PIL import Image
import os
import matplotlib.pyplot as plt
"""
from tensorflow.keras.models import load_model
from tensorflow.keras.datasets import mnist as mn
from keras.models import load_model
"""
gpus = tf.config.list_physical_devices('GPU')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
if gpus:
  # Restrict TensorFlow to only allocate 1GB of memory on the first GPU
  try:
    tf.config.set_logical_device_configuration(
        gpus[0],
        [tf.config.LogicalDeviceConfiguration(memory_limit=30000)])
    logical_gpus = tf.config.list_logical_devices('GPU')
    print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
  except RuntimeError as e:
    # Virtual devices must be set before GPUs have been initialized
    print(e)
"""

list_alp = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",]

def alph(pred):
    return str(list_alp[pred]).upper()

def FindNum(num):
  greatest = num[0][0]
  greatest_num = 0
  for num_i in range(len(num[0])):
      print(num[0][num_i])
      comp = num[0][num_i]
      if comp > greatest:
          greatest_num = num_i
          print(str(comp) + ">" + str(greatest))
          greatest = comp
  return greatest_num,greatest

#model = load_model('drawing-recognizer-model.h5')
model_MN = load_model('num-model.h5')
model_AZ = load_model('alph-model.h5')
print(model_MN.summary())
print(model_AZ.summary())
"""
(X_train, y_train),(X_test,y_test) = mn.load_data()
assert X_train.shape[0] == 60000
assert y_train.shape[0] == 60000
assert X_test.shape[0] == 10000
assert y_test.shape[0] == 10000
y_train = tf.keras.utils.to_categorical(y_train)
y_test = tf.keras.utils.to_categorical(y_test)
model.evaluate(X_test,y_test,batch_size=128,verbose=2)
"""

app = fk(__name__)

list_img=[]
for i in range(9):
    ext = 'mnist_img/X_train[' + str(i) + '].png'
    list_img.append(ext)

@app.route('/', methods=['POST','GET'])
def test():
    version = tf.__version__
    label = "None"
    if rq.method == 'POST':
       data = rq.get_json()
       data = tf.Variable(data)
       data = tf.reshape(data, shape=(1,28,28,1))
       pred_MN_li = model_MN.predict(data)
       pred_AZ_li = model_AZ.predict(data)
       pred_AZ,cert_AZ = FindNum(pred_AZ_li)
       pred_MN,cert_MN = FindNum(pred_MN_li)
       if cert_MN <= cert_AZ:
           pred_AZ = alph(pred_AZ)
           print(pred_AZ)
           return f"{str(pred_AZ)},{str(cert_AZ)},{str(cert_MN)},{str(pred_AZ_li)},{str(pred_MN_li)}"
       else:
           return f"{str(pred_MN)},{str(cert_AZ)},{str(cert_MN)},{str(pred_AZ_li)},{str(pred_MN_li)}"
    else:   
        return rt('index.html', link='index', linklabel=label, list_img=list_img,version=version, title='Demo')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=False)
