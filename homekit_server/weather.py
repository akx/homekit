import os

import requests

from homekit_server.utils import get_cache, format_mtime

FORECAST_API_KEY = os.environ.get("FORECAST_API_KEY")


def get_forecast_data(lat, lon):
    cache_key = "forecast-%.3f,%.3f" % (lat, lon)
    cache = get_cache()
    data = cache.get(cache_key)
    if data:
        data["$cached"] = True
        return data
    data = requests.get(
        url='https://api.forecast.io/forecast/%s/%.4f,%.4f' % (FORECAST_API_KEY, lat, lon),
        params={
            "units": "si",
        }
    ).json()
    data["$mtime"] = format_mtime()
    cache.set(cache_key, data, timeout=60 * 5)
    return data
