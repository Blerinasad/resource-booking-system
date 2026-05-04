import { useCallback, useEffect, useState } from 'react'
import { Search, RefreshCw, Shield, User } from 'lucide-react'
import { Badge } from '../../components/common/Badge.jsx'
import Input  from '../../components/common/Input.jsx'
import Button from '../../components/common/Button.jsx'
import Loader from '../../components/common/Loader.jsx'
import { userService } from '../../services/index.js'

const fmt = (dt) => dt ? new Date(dt).toLocaleDateString('en-GB', { dateStyle: 'medium' }) : '—'

export default function UsersPage() {
  const [users, setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await userService.getAll({ limit: 100 })
      const list = res?.data?.users || res?.data || res || []
      setUsers(Array.isArray(list) ? list : [])
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = users.filter(u =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-56">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <Button variant="ghost" icon={RefreshCw} onClick={load} className="text-xs">Refresh</Button>
      </div>

      {/* Count */}
      <p className="text-xs font-mono text-slate-500">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</p>

      {/* Table */}
      {loading ? <Loader /> : (
        <div className="card">
          {filtered.length === 0 ? (
            <div className="py-14 text-center text-slate-500 text-sm">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {['#', 'Name', 'Email', 'Role', 'Joined'].map(h => (
                      <th key={h} className="text-left pb-3 pr-6 text-xs font-mono text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-3 pr-6 font-mono text-xs text-slate-600">#{u.id}</td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/40 to-emerald-600/40 border border-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-300">
                            {u.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="font-semibold text-slate-200">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-6 font-mono text-xs text-slate-400">{u.email}</td>
                      <td className="py-3 pr-6">
                        <Badge variant={u.role === 'admin' ? 'admin' : 'user'}>
                          {u.role === 'admin'
                            ? <><Shield size={10} className="inline mr-1" />admin</>
                            : <><User size={10} className="inline mr-1" />user</>
                          }
                        </Badge>
                      </td>
                      <td className="py-3 font-mono text-xs text-slate-400">{fmt(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
