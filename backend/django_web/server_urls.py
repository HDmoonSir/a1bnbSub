CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:9596" # fast api test url
]

INTERNAL_IPS = ["127.0.0.1"]
SECRET_KEY = '_hb19%o6hdnp*9i=_epdb5i%^+q!s#9na0ff#&welq9&j0m%a1'

detect_Url = "http://127.0.0.1:9596/dl/detection"
classification_Url = "http://127.0.0.1:9597/dl/classification"
textgen_Url = "http://127.0.0.1:9596/dl/generation"
