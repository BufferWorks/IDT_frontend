import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Basic check for admin token (placeholder for now)
  // In a real app, use a Context or robust auth check
  React.useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Create Contest",
      path: "/admin/create-contest",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Manage Contests",
      path: "/admin/manage-contests",
      icon: <List size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e1f22] text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 shadow-xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between border-b border-gray-700">
            <span className="text-2xl font-bold font-['Play'] tracking-wide">
              IDT Admin
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-[#5865F2]"
          >
            <Menu size={24} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=5865F2&color=fff"
                alt="Admin"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
