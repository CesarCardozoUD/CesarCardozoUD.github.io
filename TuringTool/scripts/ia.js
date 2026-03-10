import mock from './utils/mock.js'

const API_KEY = sessionStorage.getItem('yek');
const ENV_MOCK = sessionStorage.getItem('emulate');

const ia_context = `
    Detectar Texto generado por IA.
    REGLAS:
    - Solo hablamos español.
    - El lenguaje academico es normal.
    - No marcar lenguaje técnico ni formal.
    - Solo marcar patrones de IA medio/fuertes.
    - Si tienes dudas, clasifícalo como humano.
    - NO USAR TAGS ni ATRIBUTOS QUE NO SE ESPECIFIQUEN EN OUTPUT.
`

const response_structure = `
    OUTPUT:
    - Devuelve el texto original.
    - Marca los fragmentos sospechosos usando los tags html <low>, <mid>, <high>.
    - Cada tag debe tener un atributo tooltip (≤15 palabras).
    - El atributo tooltip tendrá texto explicativo de por qué se marcó. 
`

class GroqAIManager {
    url = "https://api.groq.com/openai/v1/chat/completions";
    ia_model = "openai/gpt-oss-20b";

    setModel(selected_model){
        this.ia_model = selected_model;
        console.log(this.ia_model);
    }

    async analyzeText(original_text){

        const instructions = `
            ${ia_context}
            ---------------------
            ${response_structure}
        `
        
        const prompt = `TEXTO ORIGINAL: ${original_text}`;

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
                                role: "system",
                                content: instructions
                            },
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