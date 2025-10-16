async function getFraseMotivadora() {
  try {
    const res = await fetch("https://frasedeldia.azurewebsites.net/api/phrase");
    console.log(res)
    return(res.json())
  } catch (error) {
    console.error("Error al obtener la frase:", error.message);
  }
}

export default getFraseMotivadora
