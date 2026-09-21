import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  change: string
  icon: LucideIcon
}

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50">
          <Icon size={17} />
        </div>

        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">
          {change}
        </span>
      </div>

      <div className="mt-6 text-3xl font-semibold tracking-tight">
        {value}
      </div>

      <div className="mt-1 text-xs text-white/35">{label}</div>
    </div>
  )
}