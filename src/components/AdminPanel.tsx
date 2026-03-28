import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { Users, LayoutList, Trash2, Plus, Save, Edit2, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Category, SubCategory, Option } from '../types';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  disabled?: boolean;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'users' | 'categories'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // User Edit State
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [userError, setUserError] = useState('');

  // Category Edit State
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedSub, setExpandedSub] = useState<number | null>(null);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const usersData = snap.docs.map(d => d.data() as UserData);
      setUsers(usersData);
    });

    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      const catsData = snap.docs.map(d => d.data() as Category).sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(catsData);
      setLoading(false);
    });

    return () => {
      unsubUsers();
      unsubCats();
    };
  }, []);

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      await deleteDoc(doc(db, 'users', uid));
    }
  };

  const handleToggleRole = async (uid: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await updateDoc(doc(db, 'users', uid), { role: newRole });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');
    try {
      // Note: Creating a user via Firebase Auth client SDK logs the current user out and logs the new one in.
      // To avoid this, we would typically use a Cloud Function (Admin SDK).
      // Since we are client-side only, we can't easily create an auth user without side effects.
      // However, we can simulate it or just show a message.
      // Actually, we can use a secondary Firebase App instance, but that's complex.
      // Let's just show an alert that they should use the signup page, or we can implement a basic fetch to a custom endpoint if we had one.
      // For this prototype, we will just inform the admin.
      alert('Para adicionar um novo usuário, peça para ele criar uma conta na tela de login. Você poderá alterar as permissões dele aqui depois.');
      setIsCreatingUser(false);
    } catch (err: any) {
      setUserError(err.message);
    }
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;
    await setDoc(doc(db, 'categories', editingCategory.id), editingCategory);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Excluir esta categoria?')) {
      await deleteDoc(doc(db, 'categories', id));
    }
  };

  const handleCreateCategory = () => {
    const newCat: Category = {
      id: `cat_${Date.now()}`,
      label: 'Nova Categoria',
      subcategories: [],
      order: categories.length
    };
    setEditingCategory(newCat);
  };

  const handleAddSubcategory = () => {
    if (!editingCategory) return;
    setEditingCategory({
      ...editingCategory,
      subcategories: [...editingCategory.subcategories, { label: 'Nova Subcategoria', options: [] }]
    });
    setExpandedSub(editingCategory.subcategories.length);
  };

  const handleUpdateSubcategory = (idx: number, newLabel: string) => {
    if (!editingCategory) return;
    const newSubs = [...editingCategory.subcategories];
    newSubs[idx].label = newLabel;
    setEditingCategory({ ...editingCategory, subcategories: newSubs });
  };

  const handleDeleteSubcategory = (idx: number) => {
    if (!editingCategory) return;
    if (!window.confirm('Excluir esta subcategoria?')) return;
    const newSubs = [...editingCategory.subcategories];
    newSubs.splice(idx, 1);
    setEditingCategory({ ...editingCategory, subcategories: newSubs });
  };

  const handleAddOption = (subIdx: number) => {
    if (!editingCategory) return;
    const newSubs = [...editingCategory.subcategories];
    newSubs[subIdx].options.push({ id: `opt_${Date.now()}`, label: 'Nova Opção', description: '' });
    setEditingCategory({ ...editingCategory, subcategories: newSubs });
  };

  const handleUpdateOption = (subIdx: number, optIdx: number, field: keyof Option, value: string) => {
    if (!editingCategory) return;
    const newSubs = [...editingCategory.subcategories];
    newSubs[subIdx].options[optIdx] = { ...newSubs[subIdx].options[optIdx], [field]: value };
    setEditingCategory({ ...editingCategory, subcategories: newSubs });
  };

  const handleDeleteOption = (subIdx: number, optIdx: number) => {
    if (!editingCategory) return;
    const newSubs = [...editingCategory.subcategories];
    newSubs[subIdx].options.splice(optIdx, 1);
    setEditingCategory({ ...editingCategory, subcategories: newSubs });
  };

  if (loading) return <div className="p-8 text-zinc-400">Carregando painel...</div>;

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <div className="flex border-b border-zinc-800 p-4 gap-4 shrink-0">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users' ? 'bg-red-700/10 text-red-500' : 'text-zinc-400 hover:bg-zinc-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Usuários
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'categories' ? 'bg-red-700/10 text-red-500' : 'text-zinc-400 hover:bg-zinc-900'
          }`}
        >
          <LayoutList className="w-4 h-4" />
          Categorias e Elementos
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-zinc-100">Gerenciar Usuários</h2>
              <button
                onClick={() => setIsCreatingUser(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Novo Usuário
              </button>
            </div>

            {isCreatingUser && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-red-500">Adicionar Novo Usuário</h3>
                  <button onClick={() => setIsCreatingUser(false)} className="text-zinc-400 hover:text-zinc-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Por motivos de segurança do Firebase, novos usuários devem criar suas contas diretamente na tela de login. 
                  Após a criação, eles aparecerão nesta lista e você poderá alterar suas permissões para Administrador.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsCreatingUser(false)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors text-sm"
                  >
                    Entendi
                  </button>
                </div>
              </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">E-mail</th>
                    <th className="px-4 py-3 font-medium">Nome</th>
                    <th className="px-4 py-3 font-medium">Papel</th>
                    <th className="px-4 py-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.map(user => (
                    <tr key={user.uid} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="px-4 py-3 text-zinc-300">{user.email}</td>
                      <td className="px-4 py-3 text-zinc-300">{user.displayName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-700/10 text-red-500' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(user.uid, user.role)}
                          className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                          title="Alternar Permissão"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.uid)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
                          title="Excluir Usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-zinc-100">Gerenciar Categorias</h2>
              <button
                onClick={handleCreateCategory}
                className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Nova Categoria
              </button>
            </div>

            {editingCategory ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <h3 className="text-lg font-semibold text-red-500">Editando Categoria</h3>
                  <button onClick={() => setEditingCategory(null)} className="text-zinc-400 hover:text-zinc-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Nome da Categoria</label>
                  <input
                    type="text"
                    value={editingCategory.label}
                    onChange={e => setEditingCategory({...editingCategory, label: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-red-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm text-zinc-400">Subcategorias ({editingCategory.subcategories.length})</label>
                    <button
                      onClick={handleAddSubcategory}
                      className="text-xs flex items-center gap-1 text-red-500 hover:text-red-400"
                    >
                      <Plus className="w-3 h-3" /> Adicionar Subcategoria
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editingCategory.subcategories.map((sub, subIdx) => (
                      <div key={subIdx} className="border border-zinc-800 rounded-lg overflow-hidden">
                        <div 
                          className="bg-zinc-950 px-4 py-3 flex items-center gap-3 cursor-pointer select-none"
                          onClick={() => setExpandedSub(expandedSub === subIdx ? null : subIdx)}
                        >
                          {expandedSub === subIdx ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
                          <input
                            type="text"
                            value={sub.label}
                            onChange={e => handleUpdateSubcategory(subIdx, e.target.value)}
                            onClick={e => e.stopPropagation()}
                            className="flex-1 bg-transparent border-none text-zinc-200 focus:outline-none focus:ring-0 text-sm font-medium"
                            placeholder="Nome da Subcategoria"
                          />
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteSubcategory(subIdx); }}
                            className="text-zinc-500 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {expandedSub === subIdx && (
                          <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 space-y-3">
                            {sub.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-start gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                                <div className="flex-1 space-y-2">
                                  <input
                                    type="text"
                                    value={opt.label}
                                    onChange={e => handleUpdateOption(subIdx, optIdx, 'label', e.target.value)}
                                    className="w-full bg-transparent border-b border-zinc-800 pb-1 text-sm text-zinc-200 focus:outline-none focus:border-red-700"
                                    placeholder="Nome da Opção"
                                  />
                                  <input
                                    type="text"
                                    value={opt.description}
                                    onChange={e => handleUpdateOption(subIdx, optIdx, 'description', e.target.value)}
                                    className="w-full bg-transparent border-none text-xs text-zinc-500 focus:outline-none"
                                    placeholder="Descrição (opcional)"
                                  />
                                </div>
                                <button
                                  onClick={() => handleDeleteOption(subIdx, optIdx)}
                                  className="text-zinc-600 hover:text-red-400 mt-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => handleAddOption(subIdx)}
                              className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-400 hover:text-red-500 hover:border-red-700/50 transition-colors flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Adicionar Opção
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Categoria
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-zinc-100">{cat.label}</h3>
                        <span className="text-xs text-zinc-500">{cat.subcategories.length} subcategorias</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingCategory(cat)}
                          className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
