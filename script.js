const service = 23969;
const secret = "462d551e-63b0-407c-9301-14da82453924";
const host = "https://api.platoboost.com";

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}

// Generar identificador (en web no hay HWID real)
function getIdentifier() {
  return btoa(navigator.userAgent); // base64 simple
}

// Generar link
async function copyLink() {
  try {
    const res = await fetch(host + "/public/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service: service,
        identifier: getIdentifier()
      })
    });

    const data = await res.json();

    if (data.success) {
      navigator.clipboard.writeText(data.data.url);
      setStatus("Link copiado 🚀");
    } else {
      setStatus(data.message);
    }
  } catch (e) {
    setStatus("Error al generar link");
  }
}

// Verificar key
async function verifyKey() {
  const key = document.getElementById("keyInput").value;

  try {
    const res = await fetch(
      `${host}/public/whitelist/${service}?identifier=${getIdentifier()}&key=${key}`
    );

    const data = await res.json();

    if (data.success && data.data.valid) {
      setStatus("✅ Key válida");
    } else {
      setStatus("❌ Key inválida");
    }
  } catch (e) {
    setStatus("Error al verificar");
  }
}