// Arquivo de configuração da API para facilitar requisições HTTP
// Altere a URL abaixo para a do seu backend no Render

const API_URL = import.meta.env.VITE_API_URL || "https://transporte-backend.onrender.com";

export async function getClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

export async function createCliente(cliente) {
  const res = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}

export async function updateCliente(id, cliente) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cliente");
  return res.json();
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erro ao deletar cliente");
  return res.json();
}
