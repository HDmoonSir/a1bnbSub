#gitignore에 꼭 넣기
default_ip = "http://localhost"

cors_list = [
    default_ip+":3000", 
    default_ip+":3000", 
    default_ip+":8000", 
    default_ip+":8000",
    default_ip+":9596",
]

secret_key = ''

fast_api_ip_detection = default_ip+":9596/dl/detection"
fast_api_ip_classification = default_ip+":9597/dl/classification"
fast_api_ip_generation = default_ip+":9598/dl/generation"

frontend_ip = [default_ip, default_ip+":3000", default_ip+":8000",]

INTERNAL_IPS = ["127.0.0.1"]