import {
  BarChart3,
  CircleAlert,
  Inbox,
  LayoutDashboard,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    label: 'Tickets',
    icon: Inbox,
    to: '/dashboard/tickets',
  },
  {
    label: 'Incidents',
    icon: CircleAlert,
    to: '/dashboard/incidents',
  },
  {
    label: 'Team',
    icon: Users,
    to: '/dashboard/team',
  },
]

const systemNavigation = [
  {
    label: 'Analytics',
    icon: BarChart3,
    to: '/dashboard/analytics',
  },
  {
    label: 'Settings',
    icon: Settings,
    to: '/dashboard/settings',
  },
]

export default function DashboardSidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#080809]">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
          <Zap size={17} strokeWidth={2.5} />
        </div>

        <span className="font-semibold tracking-tight">
          SupportFlow
        </span>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-3 px-3 text-[10px] font-medium uppercase tracking-widest text-white/20">
          Workspace
        </div>

        <div className="space-y-1">
          {navigation.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="mb-3 mt-8 px-3 text-[10px] font-medium uppercase tracking-widest text-white/20">
          System
        </div>

        <div className="space-y-1">
          {systemNavigation.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium">
            SA
          </div>

          <div className="min-w-0">
            <div className="truncate text-xs font-medium">
              Samad AJJA
            </div>

            <div className="truncate text-[10px] text-white/30">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}   