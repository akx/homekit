import requests
from six import string_types

from homekit_server.utils import get_cache, format_mtime


def _get_live_foli_data(stop_num):
    return requests.get("http://data.foli.fi/siri/sm/%s" % stop_num).json()


def get_stop_info(stop_num):
    """
    Get Föli stop info for a given stop.

    :param stop_num: Stop Number. 456 for Ilpoinen :)
    :return: dict
    """
    assert isinstance(stop_num, string_types)
    cache_key = "foli-%s" % stop_num
    cache = get_cache()
    data = cache.get(cache_key)
    if data:
        data["$cached"] = True
        return data
    data = _get_live_foli_data(stop_num)
    data["$mtime"] = format_mtime()
    cache.set(cache_key, data, timeout=60 * 5)
    return data
