import datetime
import os
from tempfile import gettempdir

from werkzeug.contrib.cache import FileSystemCache


def get_cache():
    return FileSystemCache(
        os.path.join(gettempdir(), "homekit")
    )


def format_mtime():
    return datetime.datetime.utcnow().isoformat()
