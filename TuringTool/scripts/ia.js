import mock from './utils/mock.js'

const API_KEY = sessionStorage.getItem('yek');
const ENV_MOCK = sessionStorage.getItem('emulate');
const ia_context = `Eres una herramienta que evalúa si un texto podría haber sido escrito por IA.
    Solo marca fragmentos cuando haya indicios claros de generación automática.
    Si el lenguaje es formal o académico, NO lo marques por eso.
    El lenguaje de doctorado, técnico o formal es completamente normal.
    No lo consideres evidencia de IA.
    Si tienes dudas, clasifícalo como humano. `
const response_structure = `Como respuesta dame unicamente el texto original (sin ningún otro comentario), y los fragmentos que parezcan sospechosos 
    los marcaras entre las etiquetas html <high>, <mid>, <low> dependiendo de el nivel de IA. 
    Dentro de la etiqueta debe haber un atributo tooltip, que tendrá texto explicativo de porque ese nivel (máx 10 palabras). 
    NO USAR NINGUNA ETIQUETA QUE NO SE HAYA ESPECIFICADO EN ESTE PROMPT `

class GroqAIManager {
    url = "https://api.groq.com/openai/v1/chat/completions";
    ia_model = "llama-3.1-8b-instant";

    async analyzeText(original_text){
        
        let prompt = `${ia_context}
            ${response_structure}
            TEXTO ORIGINAL: ${original_text}`;

        if(ENV_MOCK === "1") {
            return mock.choices[0].message.content;
        } else {
            const response = await fetch(
                this.url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: this.ia_model,
                        messages: [
                            {
                                role: "user",
                                content: prompt
                            }
                        ]
                    })
                }
            );
            const data = await response.json();
            return data.choices[0].message.content;
        }
    }
}


export default new GroqAIManager();