from flask import Flask, jsonify, request
import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import matplotlib.pyplot as plt
from cartopy import crs as ccrs
import numpy as np
from io import BytesIO
from climatenet.models import CGNet
from climatenet.utils.utils import Config
from climatenet.utils.data import ClimateDatasetLabeled
import torch
import xarray as xr
from flask_cors import CORS
plt.switch_backend('agg')
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "http://localhost:5173"}})
cloudinary.config(
    cloud_name='ddiudyz6q',
    api_key='329585949937736',
    api_secret='7EbGo_VqXnh8QwjHr6Aap49W4Vg'
)
jc_model = CGNet(model_path= "./models/2. Weighted Jaccard/")
jc_model.network.to(device)
ce_model = CGNet(model_path= "./models/1. Weighted CE/")
ce_model.network.to(device)
jc_config = Config("./models/2. Weighted Jaccard/config.json")
ce_config = Config("./models/1. Weighted CE/config.json")
# Function to create a globe image with Cartopy
def create_globe_image(ds):
    # fig, ax = plt.subplots(
    #     subplot_kw={'projection': ccrs.PlateCarree()},
    #     figsize=(6, 4)  # Adjust the figure size as needed
    # )

    # p = data.plot(
    #     transform=ccrs.PlateCarree(),
    #     subplot_kws={"projection": ccrs.PlateCarree()},
    #     aspect=1.3,
    #     size=6,
    #     add_colorbar=False
    # )
    # ax = p.axes
    # ax.coastlines()
    # ax.gridlines()
    # plt.close(fig)  # Close the figure to avoid displaying it

    # # Save the figure to an in-memory file-like object
    # image_stream = BytesIO()
    # fig.savefig(image_stream, format='png', dpi=300, bbox_inches='tight')
    p = ds.plot(
      transform=ccrs.PlateCarree(),
      subplot_kws={"projection": ccrs.PlateCarree()},
      aspect = 1.3, size = 6,
      add_colorbar=False
    )
    ax = p.axes
    ax.coastlines()
    ax.gridlines()
    plt.draw()
    image_stream = BytesIO()
    plt.savefig(image_stream, format='png', dpi=300, bbox_inches='tight')
    plt.close()
    image_stream.seek(0)

    return image_stream

    # return image_stream
def process_input(model, input_path):
    input_path = "inference/" + input_path + "/"
    if model == "ce":
        jc_input = ClimateDatasetLabeled(path= input_path, config=jc_config)
        outputs = jc_model.predict(jc_input)
        return outputs;
    elif model == "jc":
        ce_input = ClimateDatasetLabeled(path=input_path, config=ce_config)
        outputs = ce_model.predict(ce_input)
        return outputs;
    else:
        return "Invalid model specified"
@app.route('/', methods = ["POST"])
def index():
    request_data = request.get_json()

    # Extract model and input path from the request
    model = request_data.get('model')
    input_path = request_data.get('inputPath')

    # Process input based on the specified model
    results = process_input(model, input_path)

    # Create a list to store image URLs
    image_urls = []
    print(results[0])
    for i in range(results.sizes['time']):
        data_point =  results[i]
        image_stream = create_globe_image(data_point)

        upload_result = upload(image_stream, folder='climate')

        image_url, options = cloudinary_url(upload_result['public_id'], format='png')
        
        # Append the URL to the list
        image_urls.append(image_url)

    return jsonify(image_urls)

if __name__ == '__main__':
    app.run(debug=True)

