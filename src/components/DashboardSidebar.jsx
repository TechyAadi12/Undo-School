import React from 'react';
import { Show, UserButton, useClerk } from '@clerk/react';
import { FiBookOpen, FiGrid, FiLogOut, FiUser } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: FiGrid },
  { label: 'Courses', to: '/dashboard/courses', icon: FiBookOpen },
  { label: 'Profile', to: '/dashboard/profile', icon: FiUser },
];

export default function DashboardSidebar({ userName, userEmail }) {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  return (
    <header className="rounded-[1.75rem] border border-white/45 bg-white/78 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-sm font-bold text-white shadow-md">
            EP
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">EduPathway Workspace</p>
            <p className="truncate text-sm text-slate-500">{userName} • {userEmail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <Show when="signed-in">
              <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2">
                <UserButton />
                <span className="hidden text-sm font-medium text-slate-700 sm:inline">Account</span>
              </div>
            </Show>

            <button
              type="button"
              onClick={() => signOut({ redirectUrl: `${window.location.origin}/` }).catch(() => navigate('/'))}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
