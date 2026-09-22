import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Inbox,
  Search,
  Plus,
} from 'lucide-react'
import { motion } from 'motion/react'
import StatCard from '../components/StatCard'
import TicketRow from '../components/TicketRow'
import DashboardSidebar from '../components/DashboardSidebar'
import { useEffect, useMemo, useState } from 'react'
import type { TicketSummary } from '../lib/api'
import { getTickets } from '../lib/api'
import { Link } from 'react-router-dom'


export default function Dashboard() {
    const [tickets, setTickets] = useState<TicketSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
      getTickets()
        .then(setTickets)
        .catch(() => setError('Unable to load tickets'))
        .finally(() => setLoading(false))
    }, [])

    const [search, setSearch] = useState('')

    const filteredTickets = useMemo(() => {
      const value = search.toLowerCase().trim()

      if (!value) {
        return tickets
      }

      return tickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(value) ||
          ticket.category.toLowerCase().includes(value) ||
          String(ticket.id).includes(value),
      )
    }, [search, tickets])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">
        <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
            <DashboardSidebar />
        </div>

        <main className="min-w-0 flex-1 lg:ml-64">
          <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 lg:px-10">
            <div>
              <div className="text-xs text-white/30">Workspace</div>
              <h1 className="mt-1 text-lg font-semibold">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 md:flex">
                <Search size={14} className="text-white/30" />

                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tickets..."
                    className="w-40 bg-transparent text-xs text-white outline-none placeholder:text-white/25"
                />

                <kbd className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/25">
                    /
                </kbd>
              </div>

              <Link
                to="/dashboard/tickets/new"
                className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90 sm:flex"
              >
                <Plus size={14} />
                New ticket
              </Link>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Clock3 size={15} className="text-white/40" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-sm text-white/35">September 16, 2026</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Good morning, Samad
              </h2>
              <p className="mt-1 text-sm text-white/35">
                Here is what's happening with your support workspace.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Open tickets"
                value="24"
                change="+12%"
                icon={Inbox}
              />
              <StatCard
                label="In progress"
                value="12"
                change="+4%"
                icon={Clock3}
              />
              <StatCard
                label="Resolved this month"
                value="86"
                change="+18%"
                icon={CheckCircle2}
              />
              <StatCard
                label="Critical incidents"
                value="3"
                change="-25%"
                icon={AlertCircle}
              />
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Recent tickets</h3>
                  <p className="mt-1 text-xs text-white/30">
                    Latest activity across your workspace
                  </p>
                </div>

                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white">
                  View all tickets
                </button>
              </div>

              <div>
                {loading && (
                  <div className="px-5 py-10 text-center text-sm text-white/30">
                    Loading tickets...
                  </div>
                )}

                {error && (
                  <div className="px-5 py-10 text-center text-sm text-red-300">
                    {error}
                  </div>
                )}

                {!loading && !error && filteredTickets.map((ticket) => (
                  <TicketRow
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    category={ticket.category}
                    priority={ticket.priority}
                    status={ticket.status}
                    assignee="Samad"
                  />
                ))}
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  )
}