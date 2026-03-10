const mock = {
    "id": "chatcmpl-443f2c5d-ae46-4fd5-acc6-00662f2c275c",
    "object": "chat.completion",
    "created": 1773167903,
    "model": "llama-3.1-8b-instant",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": " El café constituye \u003chigh tooltip=\"Lenguaje formal y técnico\"\u003euna fuente importante de compuestos bioactivos\u003c/high\u003e, entre los que destacan los ácidos clorogénicos, la cafeína, diterpenos (cafestol y kahweol) y melanoidinas formadas durante el tostado \u003cmid tooltip=\"Terminología tecnológica y específica de industrias\"\u003e[8]\u003c/mid\u003e. Uno de los subproductos, resultado del procesamiento del café, es el mucílago; este es rico en polisacáridos, fibra soluble y compuestos fenólicos asociados a la matriz estructural. Su valorización se ha propuesto \u003clow tooltip=\"Lenguaje y oraciones simples, muy comunes en la escritura humana\"\u003edado su potencial funcional y antioxidante\u003c/low\u003e, aunque las investigaciones actuales se han centrado más en la industria, que en salud \u003clow tooltip=\"Oraciones simples y comunes en la escritura humana\"\u003e[9]\u003c/low\u003e."
            },
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "queue_time": 0.057323232,
        "prompt_tokens": 365,
        "prompt_time": 0.02914185,
        "completion_tokens": 224,
        "completion_time": 0.407117592,
        "total_tokens": 589,
        "total_time": 0.436259442
    },
    "usage_breakdown": null,
    "system_fingerprint": "fp_020e283281",
    "x_groq": {
        "id": "req_01kkcgp0gpe5xabmf265y6dkt0",
        "seed": 278110781
    },
    "service_tier": "on_demand"
}

export default mock;