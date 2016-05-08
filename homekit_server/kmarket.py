import json
import re
import datetime
import time

import requests
from six import string_types

from homekit_server.utils import get_cache, format_mtime


def get_kmarket_data(store_id):
    """
    Get K-Market data for the given Store ID.

    Store IDs are (empirically) of the form `Knnn` where n is a number.

    :param store_id: The store ID to return data for.
    :return: dict
    """
    assert isinstance(store_id, string_types)
    cache_key = "kmarket-%s" % store_id
    cache = get_cache()
    data = cache.get(cache_key)
    date = datetime.date.today().isoformat()
    if data and data["$date"] == date:  # Fresh cached data
        data["$cached"] = True
        return data
    data = _get_live_kmarket_data(store_id)
    data["$date"] = date
    data["$mtime"] = format_mtime()
    cache.set(cache_key, data, timeout=300)
    return data


def _get_live_kmarket_data(store_id):
    cb = "u%d" % time.time()
    resp = requests.get(
        url="http://www.k-ruoka.fi/api/usertools/GetUserStoreSpecifics?callback=%s" % cb,
        headers={
            "Cookie": "UserStores=UserStores=%s" % store_id,
            "Referer": "http://www.k-ruoka.fi/",
        }
    )
    match = re.match("^%s\((\[.+\])\);" % cb, resp.text)
    return json.loads(match.group(1))[0]
