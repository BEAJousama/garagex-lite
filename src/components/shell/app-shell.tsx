"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Activity,
  Archive,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Command,
  Contact,
  Construction,
  ContactRound,
  FileArchive,
  FileChartColumnIncreasing,
  FileClock,
  FilePlus2,
  HelpCircle,
  LayoutDashboard,
  Menu as MenuIcon,
  Moon,
  MoreHorizontal,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Receipt,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  UserCircle,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  BrandMark,
  Button,
  IconButton,
  Modal,
  SearchInput,
} from "@/components/ui/primitives";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useGarage } from "@/hooks/use-garage";
import { statusLabel } from "@/domain/status";
// Screens included in GarageX Lite; everything else in the sidebar is a Pro preview.
const liteRoutes = ["/dashboard", "/customers"];
const nav = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "WORKSHOP",
    items: [
      { label: "Work Orders", href: "/work-orders", icon: Wrench },
      { label: "Inspections", href: "/inspections", icon: ClipboardIcon },
      { label: "Appointments", href: "/appointments", icon: CalendarDays },
      { label: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    label: "CUSTOMERS",
    items: [
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Vehicles", href: "/vehicles", icon: Car },
    ],
  },
  {
    label: "TEAM",
    items: [
      { label: "Mechanics", href: "/mechanics", icon: ContactRound },
      { label: "Schedule", href: "/team/schedule", icon: Calendar },
    ],
  },
  {
    label: "INVENTORY",
    items: [
      { label: "Parts", href: "/inventory", icon: Package },
      { label: "Suppliers", href: "/suppliers", icon: Building2 },
      {
        label: "Purchase Orders",
        href: "/purchase-orders",
        icon: ShoppingCart,
      },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { label: "Estimates", href: "/estimates", icon: FilePlus2 },
      { label: "Invoices", href: "/invoices", icon: Receipt },
      { label: "Payments", href: "/payments", icon: Activity },
      { label: "Expenses", href: "/expenses", icon: FileChartColumnIncreasing },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { label: "Services", href: "/services", icon: Construction },
      { label: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    label: "COMMUNICATION",
    items: [
      { label: "Messages", href: "/messages", icon: Contact },
      { label: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "Documents", href: "/documents", icon: FileArchive },
      { label: "Settings", href: "/settings/business", icon: Settings },
    ],
  },
] as const;
function ClipboardIcon(p: { size?: number }) {
  return <FileClock {...p} />;
}
type SearchResult = {
  label: string;
  description: string;
  href: string;
  category: string;
};
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const g = useGarage();
  const { theme, setTheme, systemTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [command, setCommand] = useState(false);
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [help, setHelp] = useState(false);
  const [branchMenu, setBranchMenu] = useState(false);
  const [activeResult, setActiveResult] = useState(0);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
        setActiveResult(0);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setCollapsed((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    startTransition(() => {
      setCollapsed(localStorage.getItem("garagex-sidebar") === "collapsed");
      setCompact(localStorage.getItem("garagex-compact") === "true");
    });
  }, []);
  const setNavCollapsed = (v: boolean) => {
    setCollapsed(v);
    try {
      localStorage.setItem("garagex-sidebar", v ? "collapsed" : "expanded");
    } catch {}
  };
  const searchResults = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q)
      return [
        {
          label: "WO-2026-0291 — BMW M4 Competition",
          description: "James Wilson · In Progress",
          href: "/work-orders/WO-2026-0291",
          category: "Recent",
        },
        ...g.customers.slice(0, 4).map((c) => ({
          label: c.name,
          description: c.company || c.email,
          href: `/customers/${c.id}`,
          category: "Customers",
        })),
        {
          label: "New work order",
          description: "Create a repair or service order",
          href: "/work-orders/new",
          category: "Quick action",
        },
        {
          label: "Book appointment",
          description: "Schedule a vehicle visit",
          href: "/appointments",
          category: "Quick action",
        },
      ];
    return [
      ...g.workOrders
        .filter((w) => {
          const v = g.vehicles.find((v) => v.id === w.vehicleId);
          const c = g.customers.find((c) => c.id === w.customerId);
          return `${w.id} ${v?.make} ${v?.model} ${v?.plate} ${c?.name} ${v?.vin}`
            .toLowerCase()
            .includes(q);
        })
        .slice(0, 4)
        .map((w) => ({
          label: `${w.id} — ${g.vehicles.find((v) => v.id === w.vehicleId)?.make} ${g.vehicles.find((v) => v.id === w.vehicleId)?.model}`,
          description: `${g.customers.find((c) => c.id === w.customerId)?.name} · ${statusLabel(w.status)}`,
          href: `/work-orders/${w.id}`,
          category: "Work Orders",
        })),
      ...g.customers
        .filter((c) =>
          `${c.name} ${c.email} ${c.phone} ${c.company || ""}`
            .toLowerCase()
            .includes(q),
        )
        .slice(0, 3)
        .map((c) => ({
          label: c.name,
          description: c.company || c.email,
          href: `/customers/${c.id}`,
          category: "Customers",
        })),
      ...g.vehicles
        .filter((v) =>
          `${v.make} ${v.model} ${v.plate} ${v.vin}`.toLowerCase().includes(q),
        )
        .slice(0, 3)
        .map((v) => ({
          label: `${v.year} ${v.make} ${v.model}`,
          description: `${v.plate} · ${g.customers.find((c) => c.id === v.customerId)?.name}`,
          href: `/vehicles/${v.id}`,
          category: "Vehicles",
        })),
      ...g.invoices
        .filter((i) => i.id.toLowerCase().includes(q))
        .slice(0, 2)
        .map((i) => ({
          label: i.id,
          description: `${g.customers.find((c) => c.id === i.customerId)?.name} · invoice`,
          href: `/invoices/${i.id}`,
          category: "Invoices",
        })),
    ].slice(0, 12);
  }, [query, g.workOrders, g.customers, g.vehicles, g.invoices]);
  const go = (href: string) => {
    setCommand(false);
    setQuick(false);
    setNotifications(false);
    setMobile(false);
    router.push(href);
  };
  const quickItems = [
    ["New work order", Wrench, "/work-orders/new"],
    ["Book appointment", CalendarDays, "/appointments"],
    ["Add customer", Users, "/customers?create=true"],
    ["Add vehicle", Car, "/vehicles?create=true"],
    ["New estimate", FilePlus2, "/estimates?create=true"],
    ["New invoice", Receipt, "/invoices?create=true"],
    ["Add expense", FileChartColumnIncreasing, "/expenses?create=true"],
    ["Create purchase order", ShoppingCart, "/purchase-orders?create=true"],
  ] as const;
  const branchOptions = g.locations;
  const sidebar = (
    <>
      <div className="sidebar-brand-row">
        <BrandMark />
        <IconButton
          className="sidebar-collapse"
          label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setNavCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </IconButton>
      </div>
      <button
        className="branch-switch"
        onClick={() => setBranchMenu(!branchMenu)}
        aria-expanded={branchMenu}
      >
        <span className="branch-monogram">
          <Building2 size={16} />
        </span>
        <span className="branch-detail">
          <strong>{g.locationLabel}</strong>
          <small>Garage workspace</small>
        </span>
        <ChevronDown size={14} />
      </button>
      {branchMenu && (
        <div className="branch-menu">
          {branchOptions.map((l) => (
            <button
              key={l.id}
              className={l.id === g.locationId ? "selected" : ""}
              onClick={() => {
                g.dispatch({ type: "location", id: l.id });
                setBranchMenu(false);
              }}
            >
              <span>
                <strong>{l.name}</strong>
                <small>{l.bays} service bays</small>
              </span>
              {l.id === g.locationId && <Check size={14} />}
            </button>
          ))}
          <button
            onClick={() => {
              g.dispatch({ type: "location", id: "all" });
              setBranchMenu(false);
            }}
          >
            <span>
              <strong>All locations</strong>
              <small>Company overview</small>
            </span>
            {g.locationId === "all" && <Check size={14} />}
          </button>
        </div>
      )}
      <nav className="sidebar-scroll" aria-label="Main navigation">
        {nav.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => (
              <Link
                title={collapsed ? item.label : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMobile(false)}
                className={`nav-link ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/")) ? "active" : ""}`}
              >
                <item.icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
                {!liteRoutes.includes(item.href) && (
                  <i className="pro-badge">PRO</i>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-link support-link" onClick={() => setHelp(true)}>
          <HelpCircle size={17} />
          <span>Help & support</span>
          <ArrowUpRight size={13} />
        </button>
        <div className="profile-control">
          <Avatar name="Alex Morgan" color="orange" />
          <div className="profile-detail">
            <strong>Alex Morgan</strong>
            <small>Shop Manager</small>
          </div>
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <button
                className="icon-btn profile-menu"
                aria-label="Account menu"
              >
                <MoreHorizontal size={16} />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <Dropdown.Content className="menu-content" align="end" side="top">
                <Dropdown.Item
                  className="menu-item"
                  onSelect={() => go("/settings/team")}
                >
                  <UserCircle size={14} />
                  Profile & preferences
                </Dropdown.Item>
                <Dropdown.Item
                  className="menu-item"
                  onSelect={() => go("/settings/business")}
                >
                  <Settings size={14} />
                  Business settings
                </Dropdown.Item>
                <Dropdown.Item
                  className="menu-item menu-danger"
                  onSelect={g.resetDemo}
                >
                  <Archive size={14} />
                  Reset demo data
                </Dropdown.Item>
                <Dropdown.Item
                  className="menu-item"
                  onSelect={() => go("/sign-in")}
                >
                  <ArrowRight size={14} />
                  Sign out
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Portal>
          </Dropdown.Root>
        </div>
      </div>
    </>
  );
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password")
  )
    return <>{children}</>;
  return (
    <div className={`app-shell ${collapsed ? "sidebar-compact" : ""}`}>
      <aside className="desktop-sidebar">{sidebar}</aside>
      <div
        className="mobile-dim"
        data-open={mobile || undefined}
        onClick={() => setMobile(false)}
      />
      <aside className={`mobile-sidebar ${mobile ? "mobile-open" : ""}`}>
        <IconButton
          className="mobile-close"
          label="Close navigation"
          onClick={() => setMobile(false)}
        >
          <X size={20} />
        </IconButton>
        {sidebar}
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <IconButton
              className="mobile-nav-trigger"
              label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <MenuIcon size={20} />
            </IconButton>
            <button
              className="topbar-search"
              onClick={() => {
                setCommand(true);
                setQuery("");
              }}
              aria-label="Search GarageX"
            >
              <Search size={16} />
              <span>Search work orders, vehicles, customers...</span>
              <kbd>
                <Command size={10} /> K
              </kbd>
            </button>
          </div>
          <div className="topbar-right">
            <span className="topbar-date">
              <span className="online-dot" /> Monday, Oct 5
            </span>
            <IconButton
              label="Create new"
              className="quick-create-trigger"
              onClick={() => setQuick(true)}
            >
              <Plus size={18} />
            </IconButton>
            <IconButton
              label="Notifications"
              className="notification-trigger"
              onClick={() => setNotifications(true)}
            >
              <Bell size={18} />
              {g.notifications.some((n) => !n.read) && <i />}
            </IconButton>
            <IconButton
              label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() =>
                setTheme(
                  theme === "dark" ||
                    (theme === undefined && systemTheme === "dark")
                    ? "light"
                    : "dark",
                )
              }
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </IconButton>
            <span className="topbar-divider" />
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <button className="topbar-profile">
                  <Avatar name="Alex Morgan" color="orange" />
                  <ChevronDown size={13} />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Portal>
                <Dropdown.Content
                  className="menu-content"
                  align="end"
                  sideOffset={9}
                >
                  <Dropdown.Item
                    className="menu-item"
                    onSelect={() => go("/settings/team")}
                  >
                    <UserCircle size={14} />
                    Your profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="menu-item"
                    onSelect={() => go("/settings/notifications")}
                  >
                    <Bell size={14} />
                    Notification settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="menu-item"
                    onSelect={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <Sun size={14} />
                    Switch appearance
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown.Root>
          </div>
        </header>
        <main
          className={`main-content ${compact ? "density-compact" : ""}`}
          id="main-content"
          key={pathname}
        >
          {children}
          <footer className="app-footer">
            <span>GARAGEX · Workshop management, thoughtfully built.</span>
            <span>
              <i className="online-dot" /> Demo workspace · Fictional records
            </span>
          </footer>
        </main>
      </div>
      <Modal
        open={command}
        onClose={() => setCommand(false)}
        title="Search GarageX"
        description="Find a customer, vehicle, work order or invoice."
      >
        <div
          className="command-body"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveResult((i) => Math.min(i + 1, searchResults.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveResult((i) => Math.max(0, i - 1));
            }
            if (e.key === "Enter" && searchResults[activeResult])
              go(searchResults[activeResult].href);
          }}
        >
          <SearchInput
            autoFocus
            value={query}
            onChange={(v) => {
              setQuery(v);
              setActiveResult(0);
            }}
            placeholder="Search GarageX..."
          />
          {!query && (
            <div className="quick-menu-list">
              <span>QUICK ACTIONS</span>
              {quickItems.slice(0, 5).map(([label, Icon, href]) => (
                <button onClick={() => go(href)} key={label}>
                  <Icon size={15} />
                  {label}
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          )}
          <div className="command-results">
            {searchResults.map((r, i) => (
              <button
                className={i === activeResult ? "active" : ""}
                onMouseEnter={() => setActiveResult(i)}
                onClick={() => go(r.href)}
                key={r.href + r.label}
              >
                <span className="command-result-icon">
                  <Search size={15} />
                </span>
                <span>
                  <strong>{r.label}</strong>
                  <small>{r.description}</small>
                </span>
                <em>{r.category}</em>
                <ArrowUpRight size={14} />
              </button>
            ))}
            {query && !searchResults.length && (
              <p className="command-empty">
                No records match “{query}”. Search by customer, registration or
                VIN.
              </p>
            )}
          </div>
          <div className="command-footer">
            <span>
              <kbd>↑↓</kbd> Navigate
            </span>
            <span>
              <kbd>↵</kbd> Open
            </span>
            <span>
              <kbd>esc</kbd> Close
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        open={quick}
        onClose={() => setQuick(false)}
        title="Quick create"
        description="Put your workshop in motion."
      >
        <div className="quick-action-grid">
          {quickItems.map(([label, Icon, href]) => (
            <button onClick={() => go(href)} key={label}>
              <span>
                <Icon size={19} />
              </span>
              <strong>{label}</strong>
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
      </Modal>
      <Modal
        open={notifications}
        onClose={() => setNotifications(false)}
        title="Notifications"
        description={`${g.notifications.filter((n) => !n.read).length} unread updates`}
        drawer
      >
        <div className="notification-drawer">
          <Button
            variant="ghost"
            onClick={() => g.dispatch({ type: "read-all" })}
          >
            Mark all read
          </Button>
          {g.notifications.slice(0, 18).map((n) => (
            <button
              key={n.id}
              className={`notification-item ${n.read ? "is-read" : ""}`}
              onClick={() => {
                g.dispatch({ type: "read-notification", id: n.id });
                go(n.href);
              }}
            >
              <span className={`notification-symbol n-${n.kind}`}>
                <Bell size={16} />
              </span>
              <span>
                <strong>{n.title}</strong>
                <small>{n.body}</small>
                <time>{n.time}</time>
              </span>
              {!n.read && <i />}
            </button>
          ))}
        </div>
      </Modal>
      <Modal
        open={help}
        onClose={() => setHelp(false)}
        title="Your workshop, at a glance"
        description="A few quick ways to get comfortable in GarageX."
      >
        <div className="help-cards">
          <div>
            <Wrench size={19} />
            <strong>Start with a work order</strong>
            <p>
              Track a vehicle from check-in, through diagnostics, to pickup.
            </p>
          </div>
          <div>
            <ClipboardIcon size={19} />
            <strong>Send a digital inspection</strong>
            <p>
              Record issues and turn approved recommendations into paid work.
            </p>
          </div>
          <div>
            <Package size={19} />
            <strong>Stay ahead on parts</strong>
            <p>
              See reorder levels, create purchase orders, and receive stock.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => go("/work-orders/WO-2026-0291")}
          >
            Explore the BMW M4 job <ArrowUpRight size={15} />
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export function Avatar({
  name,
  color = "amber",
}: {
  name: string;
  color?: string;
}) {
  return (
    <span className={`user-avatar avatar-${color}`} aria-label={name}>
      {name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()}
    </span>
  );
}
