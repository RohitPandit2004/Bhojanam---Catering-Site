import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { categories } from '../../data/mockData'
import Modal from '../../components/Modal'
import { Input, Select, Textarea } from '../../components/Field'

const emptyForm = { name: '', description: '', price: '', category: categories[0].id, image: '', availability: true, veg: true }

export default function MenuManagement() {
  const { foods, addFood, updateFood, deleteFood } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(food) {
    setEditingId(food.id)
    setForm({
      name: food.name,
      description: food.desc,
      price: food.price,
      category: food.category,
      image: food.image,
      availability: food.availability !== false,
      veg: food.veg,
    })
    setModalOpen(true)
  }

  function handleSave() {
    const payload = {
      name: form.name,
      desc: form.description,
      price: Number(form.price) || 0,
      category: form.category,
      image: form.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      availability: form.availability,
      veg: form.veg,
      ingredients: '',
    }
    if (editingId) updateFood(editingId, payload)
    else addFood(payload)
    setModalOpen(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-ink">Menu Management</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-maroon-500 hover:bg-maroon-600 text-white text-sm font-semibold px-4 py-2.5 rounded-thali transition-colors"
        >
          <Plus size={15} /> Add Food
        </button>
      </div>

      <div className="overflow-x-auto rounded-thali border border-ink/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Food Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Availability</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {foods.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-3 font-medium text-ink">{f.name}</td>
                <td className="px-4 py-3 text-muted capitalize">{categories.find((c) => c.id === f.category)?.name || f.category}</td>
                <td className="px-4 py-3 text-ink">₹{f.price}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${f.availability !== false ? 'bg-leaf/10 text-leaf' : 'bg-chili/10 text-chili'}`}>
                    {f.availability !== false ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(f)} className="p-1.5 text-ink/60 hover:text-maroon-500" aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => deleteFood(f.id)} className="p-1.5 text-ink/60 hover:text-chili" aria-label="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="max-w-md">
        <div className="p-6">
          <h2 className="font-display text-xl text-ink mb-5">{editingId ? 'Edit Food' : 'Add Food'}</h2>
          <div className="space-y-4">
            <Input label="Food Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Textarea label="Description" rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price (₹)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
              <Select
                label="Category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                options={categories.map((c) => c.id)}
              />
            </div>
            <Input label="Image URL" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://…" />
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-leaf" checked={form.veg} onChange={(e) => setForm((f) => ({ ...f, veg: e.target.checked }))} />
                Vegetarian
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-maroon-500" checked={form.availability} onChange={(e) => setForm((f) => ({ ...f, availability: e.target.checked }))} />
                Available
              </label>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  )
}
