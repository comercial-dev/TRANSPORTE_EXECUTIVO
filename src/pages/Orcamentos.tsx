import React, { useState } from "react";


export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    embarque: "",
    desembarque: "",
    dataHoraEmbarque: "",
    dataHoraDesembarque: "",
    volta: false,
    embarqueVolta: "",
    desembarqueVolta: "",
    dataHoraEmbarqueVolta: "",
    dataHoraDesembarqueVolta: "",
    qtdPessoas: 1,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOrcamentos((prev) => [
      ...prev,
      { ...form, id: Date.now() }
    ]);
    setForm({
      embarque: "",
      desembarque: "",
      dataHoraEmbarque: "",
      dataHoraDesembarque: "",
      volta: false,
      embarqueVolta: "",
      desembarqueVolta: "",
      dataHoraEmbarqueVolta: "",
      dataHoraDesembarqueVolta: "",
      qtdPessoas: 1,
    });
    setShowForm(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Orçamentos</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >Criar Orçamento</button>

      {/* Lista de orçamentos */}
      {orcamentos.length === 0 ? (
        <div className="mb-6 text-gray-500">Nenhum orçamento cadastrado.</div>
      ) : (
        <table className="w-full mb-6 bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 text-left">Embarque</th>
              <th className="p-2 text-left">Desembarque</th>
              <th className="p-2 text-left">Data/Hora</th>
              <th className="p-2 text-left">Qtd. Pessoas</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.embarque}</td>
                <td className="p-2">{o.desembarque}</td>
                <td className="p-2">{o.dataHoraEmbarque}</td>
                <td className="p-2">{o.qtdPessoas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Formulário de novo orçamento */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-6">
          <div>
            <label className="block font-medium">Local de Embarque</label>
            <input name="embarque" value={form.embarque} onChange={handleChange} className="border rounded w-full p-2" required />
          </div>
          <div>
            <label className="block font-medium">Local de Desembarque</label>
            <input name="desembarque" value={form.desembarque} onChange={handleChange} className="border rounded w-full p-2" required />
          </div>
          <div>
            <label className="block font-medium">Data e Hora de Embarque</label>
            <input type="datetime-local" name="dataHoraEmbarque" value={form.dataHoraEmbarque} onChange={handleChange} className="border rounded w-full p-2" required />
          </div>
          <div>
            <label className="block font-medium">Data e Hora de Desembarque</label>
            <input type="datetime-local" name="dataHoraDesembarque" value={form.dataHoraDesembarque} onChange={handleChange} className="border rounded w-full p-2" required />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="volta" checked={form.volta} onChange={handleChange} className="mr-2" />
              Corrida com volta
            </label>
          </div>
          {form.volta && (
            <>
              <div>
                <label className="block font-medium">Local de Embarque da Volta</label>
                <input name="embarqueVolta" value={form.embarqueVolta} onChange={handleChange} className="border rounded w-full p-2" required={form.volta} />
              </div>
              <div>
                <label className="block font-medium">Local de Desembarque da Volta</label>
                <input name="desembarqueVolta" value={form.desembarqueVolta} onChange={handleChange} className="border rounded w-full p-2" required={form.volta} />
              </div>
              <div>
                <label className="block font-medium">Data e Hora de Embarque da Volta</label>
                <input type="datetime-local" name="dataHoraEmbarqueVolta" value={form.dataHoraEmbarqueVolta} onChange={handleChange} className="border rounded w-full p-2" required={form.volta} />
              </div>
              <div>
                <label className="block font-medium">Data e Hora de Desembarque da Volta</label>
                <input type="datetime-local" name="dataHoraDesembarqueVolta" value={form.dataHoraDesembarqueVolta} onChange={handleChange} className="border rounded w-full p-2" required={form.volta} />
              </div>
            </>
          )}
          <div>
            <label className="block font-medium">Quantidade de Pessoas</label>
            <input type="number" name="qtdPessoas" min={1} value={form.qtdPessoas} onChange={handleChange} className="border rounded w-full p-2" required />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Criar Orçamento</button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
