from flask import Flask, jsonify

from homekit_server.foli import get_stop_info
from homekit_server.kmarket import get_kmarket_data
from homekit_server.weather import get_forecast_data

app = Flask(__name__)


@app.route("/data")
def get_data():
    return jsonify({
        "kmarket": get_kmarket_data("K624"),
        "foli": get_stop_info("456"),
        "forecast": get_forecast_data(60.455, 22.25),
    })
