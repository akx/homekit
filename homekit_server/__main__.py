if __name__ == "__main__":
    import sys, os
    sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), "..")))
    from homekit_server.app import app
    from homekit_server.utils import get_cache
    get_cache().clear()
    app.run(debug=True)
