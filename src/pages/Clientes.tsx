

import React, { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../lib/api-clientes";


export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [adicionando, setAdicionando] = useState(false);
  const [menuOpcoes, setMenuOpcoes] = useState(null); // id do cliente que abriu o menu
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "", cpf: "", origem: "", endereco: "", cidadeEstado: "" });
  const enderecoInputRef = useRef(null);
  const [erro, setErro] = useState("");

  function handleEdit(cliente) {
    setEditando(cliente.id);
    setForm({
      nome: cliente.nome || "",
      whatsapp: cliente.whatsapp || "",
      email: cliente.email || "",
      cpf: cliente.cpf || "",
      origem: cliente.origem || "",
      endereco: cliente.endereco || "",
      cidadeEstado: cliente.cidadeEstado || ""
    });
    setErro("");
    setMenuOpcoes(null);
  }

  async function handleDelete(id) {
    try {
      await deleteCliente(id);
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setErro("Erro ao excluir cliente");
    }
    setMenuOpcoes(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "cpf") {
      // Remove tudo que não for número
      let numbers = value.replace(/\D/g, "");
      // Limita a 11 dígitos
      numbers = numbers.slice(0, 11);
      // Aplica a máscara 000.000.000-00
      let masked = numbers;
      if (numbers.length > 9) masked = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      else if (numbers.length > 6) masked = numbers.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
      else if (numbers.length > 3) masked = numbers.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      setForm((prev) => ({ ...prev, [name]: masked }));
    } else if (name === "whatsapp") {
      // Aceita apenas números
      let numbers = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, [name]: numbers }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function validarCampos() {
    if (!form.nome.trim() || !form.whatsapp.trim() || !form.email.trim() || !form.cpf.trim() || !form.origem.trim() || !form.endereco.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return false;
    }
    // Validação simples de CPF (apenas formato)
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
      setErro("CPF inválido. Use o formato 000.000.000-00.");
      return false;
    }
    setErro("");
    return true;
  }

  // Google Places Autocomplete
  useEffect(() => {
    if (!editando) return;
    let autocomplete;
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve(null);
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    async function initAutocomplete() {
      await loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB7reHG7So1JlO9zHtKXSueAuDEseGoRuc&libraries=places');
      if (!enderecoInputRef.current || !window.google) return;
                 autocomplete = new window.google.maps.places.Autocomplete(enderecoInputRef.current, {
                   types: ['geocode'],
                   componentRestrictions: { country: 'br' },
                 });
                 autocomplete.addListener('place_changed', () => {
                   const place = autocomplete.getPlace();
                   if (place.formatted_address) {
                     setForm((prev) => ({ ...prev, endereco: place.formatted_address }));
                     // Also update the input value directly, since it's uncontrolled
                     if (enderecoInputRef.current) {
                       enderecoInputRef.current.value = place.formatted_address;
                     }
                   }
                 });
    }
    initAutocomplete();
    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
    // eslint-disable-next-line
  }, [editando]);

  async function handleSave(id) {
    if (!validarCampos()) return;
    try {
      await updateCliente(id, form);
      const atualizados = await getClientes();
      setClientes(atualizados);
      setEditando(null);
    } catch (err) {
      setErro("Erro ao atualizar cliente");
    }
  }
  // Buscar clientes ao carregar a página
  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setErro("Erro ao buscar clientes");
      }
    }
    fetchClientes();
  }, []);

  function handleCancel() {
    setEditando(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setForm({ nome: "", whatsapp: "", email: "", cpf: "", origem: "", endereco: "", cidadeEstado: "" });
            setAdicionando(true);
            setErro("");
          }}
        >Adicionar novo cliente</button>
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Cidade/Estado</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border-t">
              <td className="p-2">{cliente.nome}</td>
              <td className="p-2">{cliente.cidadeEstado || "-"}</td>
              <td className="p-2 flex gap-2 items-center relative">
                <button
                  className="text-orange-500 hover:text-orange-700"
                  onClick={() => setMenuOpcoes(menuOpcoes === cliente.id ? null : cliente.id)}
                  title="Opções"
                >
                  <Pencil size={18} />
                </button>
                {menuOpcoes === cliente.id && (
                  <div className="absolute z-10 left-8 top-1 bg-white border rounded shadow p-2 flex flex-col min-w-[100px]">
                    <button
                      className="text-left px-2 py-1 hover:bg-gray-100"
                      onClick={() => handleEdit(cliente)}
                    >Editar</button>
                    <button
                      className="text-left px-2 py-1 hover:bg-gray-100 text-red-600"
                      onClick={() => handleDelete(cliente.id)}
                    >Excluir</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edição */}
      {(editando || adicionando) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{adicionando ? "Adicionar Cliente" : "Editar Cliente"}</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-medium">Cidade/Estado</label>
                <input name="cidadeEstado" value={form.cidadeEstado} onChange={handleChange} className="border rounded w-full p-2" placeholder="Ex: São Paulo/SP" />
              </div>
              <div>
                <label className="block font-medium">Nome Completo <span className="text-red-500">*</span></label>
                <input name="nome" value={form.nome} onChange={handleChange} className="border rounded w-full p-2" required />
              </div>
              <div>
                <label className="block font-medium">N° WhatsApp <span className="text-red-500">*</span></label>
                <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="border rounded w-full p-2" required inputMode="numeric" pattern="[0-9]*" maxLength={15} placeholder="Ex: 11999999999" />
              </div>
              <div>
                <label className="block font-medium">Email <span className="text-red-500">*</span></label>
                <input name="email" value={form.email} onChange={handleChange} className="border rounded w-full p-2" required />
              </div>
              <div>
                <label className="block font-medium">CPF <span className="text-red-500">*</span></label>
                <input name="cpf" value={form.cpf} onChange={handleChange} className="border rounded w-full p-2" maxLength={14} inputMode="numeric" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00" required />
              </div>
              <div>
                <label className="block font-medium">Origem do Lead <span className="text-red-500">*</span></label>
                <select name="origem" value={form.origem} onChange={handleChange} className="border rounded w-full p-2" required>
                  <option value="">Selecione...</option>
                  <option value="instagram">Instagram</option>
                  <option value="google">Google</option>
                  <option value="indicacao">Indicação</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Endereço <span className="text-red-500">*</span></label>
                <input
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className="border rounded w-full p-2"
                  ref={enderecoInputRef}
                  placeholder="Digite o endereço ou selecione no Google Maps"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            {erro && <div className="text-red-500 mt-2">{erro}</div>}
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  if (adicionando) {
                    if (!validarCampos()) return;
                    (async () => {
                      try {
                        await createCliente(form);
                        const atualizados = await getClientes();
                        setClientes(atualizados);
                        setAdicionando(false);
                      } catch (err) {
                        setErro("Erro ao criar cliente");
                      }
                    })();
                  } else {
                    handleSave(editando);
                  }
                }}
              >Salvar</button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setAdicionando(false);
                  handleCancel();
                }}
              >Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
