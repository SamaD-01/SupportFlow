import { ArrowUpRight, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

type TicketRowProps = {
  id: number
  title: string
  category: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED'
  assignee: string
}

const priorityStyles = {
  LOW: 'bg-white/5 text-white/40',
  MEDIUM: 'bg-blue-400/10 text-blue-300',
  HIGH: 'bg-orange-400/10 text-orange-300',
  CRITICAL: 'bg-red-400/10 text-red-300',
}

const statusStyles = {
  OPEN: 'text-blue-300',
  IN_PROGRESS: 'text-amber-300',
  WAITING: 'text-purple-300',
  RESOLVED: 'text-emerald-300',
}

export default function TicketRow({
  id,
  title,
  category,
  priority,
  status,
  assignee,
}: TicketRowProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
    >
        <Link
        to={`/dashboard/tickets/${id}`}
        className="group flex items-center gap-4 border-b border-white/5 px-5 py-4 transition hover:bg-white/[0.025]"
        >
        <div className="hidden w-16 text-xs text-white/25 sm:block">#{id}</div>

        <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white/85">
            {title}
            </div>
            <div className="mt-1 text-[10px] text-white/25">{category}</div>
        </div>

        <div
            className={`hidden rounded-full px-2.5 py-1 text-[9px] font-medium sm:block ${priorityStyles[priority]}`}
        >
            {priority}
        </div>

        <div
            className={`hidden items-center gap-1.5 text-[10px] md:flex ${statusStyles[status]}`}
        >
            <Circle size={6} fill="currentColor" />
            {status.replace('_', ' ')}
        </div>

        <div className="hidden w-20 text-right text-[10px] text-white/30 lg:block">
            {assignee}
        </div>

        <ArrowUpRight
            size={15}
            className="text-white/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
        />
        </Link>
    </motion.div>
  )
}