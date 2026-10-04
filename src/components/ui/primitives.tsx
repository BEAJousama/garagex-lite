"use client";
import Link from "next/link";
import {
  useEffect,
  useState,
  startTransition,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge as Badge } from "./status-badge";
export const Button = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "ghost" | "danger" | "quiet";
  size?: "sm" | "md" | "lg";
}) => (
  <button
    className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
    {...props}
  >
    {children}
  </button>
);
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/dashboard"
      className={cn("brand-mark", compact && "brand-compact")}
      aria-label="GarageX dashboard"
    >
      <span className="brand-symbol">
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M8 25.5 10.6 17c.4-1.2 1.5-2 2.8-2h13.2c1.3 0 2.4.8 2.8 2l2.6 8.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6.8 23.5h26.4c1 0 1.8.8 1.8 1.8v5.2h-4.2v-3H9.2v3H5v-5.2c0-1 .8-1.8 1.8-1.8ZM12.2 17.2l1.3-4.1h13l1.3 4.1"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="12.6" cy="23" r="1.3" fill="currentColor" />
          <circle cx="27.4" cy="23" r="1.3" fill="currentColor" />
          <path d="m18 19 2-3 2 3-2 3-2-3Z" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-word">
        GARAGE<span>X</span>
      </span>
    </Link>
  );
}
const colors = [
  "amber",
  "blue",
  "green",
  "violet",
  "rose",
  "teal",
  "slate",
  "orange",
];
export function EntityAvatar({
  name,
  color,
  size = "md",
  kind,
}: {
  name: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  kind?: "person" | "vehicle";
}) {
  return (
    <span
      className={`entity-avatar avatar-${color || colors[name.length % colors.length]} avatar-${size} ${kind === "vehicle" ? "avatar-vehicle" : ""}`}
      aria-label={name}
    >
      {kind === "vehicle" ? (
        <span aria-hidden="true">
          {name
            .split(" ")
            .map((v) => v[0])
            .slice(0, 2)
            .join("")}
        </span>
      ) : (
        name
          .split(/\s+/)
          .map((v) => v[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      )}
    </span>
  );
}
export function StatusBadge({
  status,
  tiny = false,
}: {
  status: string;
  tiny?: boolean;
}) {
  return <Badge status={status} tiny={tiny} />;
}
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href: string }[];
}) {
  return (
    <header className="page-heading">
      {breadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={b.href}>
              {i > 0 && <ChevronRight size={13} />}
              <Link href={b.href}>{b.label}</Link>
            </span>
          ))}
        </nav>
      )}
      <div className="page-heading-row">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </header>
  );
}
export function Card({
  children,
  className,
  title,
  subtitle,
  action,
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  flush?: boolean;
}) {
  return (
    <section className={cn("surface-card", className)}>
      {title && (
        <header className="surface-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={flush ? "surface-flush" : "surface-body"}>{children}</div>
    </section>
  );
}
export function MetricCard({
  label,
  value,
  change,
  comparison,
  icon,
  accent = "slate",
  caption,
  footnote,
  href,
}: {
  label: string;
  value: string;
  change?: string;
  comparison?: "up" | "down" | "neutral";
  icon: ReactNode;
  accent?: string;
  caption?: string;
  footnote?: string;
  href?: string;
}) {
  const body = (
    <div className="metric-card">
      <div className="metric-head">
        <span>{label}</span>
        <span className={`metric-icon icon-${accent}`}>{icon}</span>
      </div>
      <div className="metric-number">{value}</div>
      <div className="metric-foot">
        {change && (
          <span className={`metric-change change-${comparison || "up"}`}>
            {comparison === "down" ? (
              <ArrowDownRight size={13} />
            ) : (
              <ArrowUpRight size={13} />
            )}{" "}
            {change}
          </span>
        )}
        <span className="metric-caption">{caption || footnote}</span>
      </div>
    </div>
  );
  return href ? (
    <Link href={href} className="metric-link">
      {body}
    </Link>
  ) : (
    body
  );
}
export function EntityLink({
  href,
  name,
  id,
  color,
  kind,
}: {
  href: string;
  name: string;
  id?: string;
  color?: string;
  kind?: "person" | "vehicle";
}) {
  return (
    <Link href={href} className="entity-link">
      <EntityAvatar name={name} color={color} kind={kind} size="sm" />
      <span>
        <strong>{name}</strong>
        {id && <small className="mono">{id}</small>}
      </span>
    </Link>
  );
}
export function IconButton({
  children,
  label,
  onClick,
  className,
  variant,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: string;
}) {
  return (
    <button
      className={cn("icon-btn", variant && `icon-${variant}`, className)}
      onClick={onClick}
      aria-label={label}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className={cn("search-control", className)}>
      <Search size={16} />
      <input
        autoFocus={autoFocus}
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <IconButton label="Clear search" onClick={() => onChange("")}>
          <X size={14} />
        </IconButton>
      )}
    </div>
  );
}
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
  className?: string;
}) {
  return (
    <span className={cn("select-control", className)}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option
            key={typeof o === "string" ? o : o.value}
            value={typeof o === "string" ? o : o.value}
          >
            {typeof o === "string" ? o : o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} />
    </span>
  );
}
export function Menu({
  children,
  items,
  label = "More options",
}: {
  children?: ReactNode;
  items: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    danger?: boolean;
    disabled?: boolean;
  }[];
  label?: string;
}) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="icon-btn" aria-label={label} type="button">
          {children || <MoreHorizontal size={18} />}
        </button>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className="menu-content" sideOffset={6} align="end">
          {items.map((i) => (
            <Dropdown.Item
              key={i.label}
              className={cn(
                "menu-item",
                i.danger && "menu-danger",
                i.disabled && "menu-disabled",
              )}
              disabled={i.disabled}
              onSelect={i.onClick}
            >
              {i.icon}
              {i.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  drawer = false,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  drawer?: boolean;
  wide?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content
          className={cn(
            "modal-content",
            drawer && "modal-drawer",
            wide && "modal-wide",
          )}
        >
          <header className="modal-heading">
            <div>
              <Dialog.Title>{title}</Dialog.Title>
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <IconButton label="Close dialog">
                <X size={19} />
              </IconButton>
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function PopoverMenu({
  trigger,
  items,
}: {
  trigger: ReactNode;
  items: { label: string; icon?: ReactNode; onSelect: () => void }[];
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="menu-content" sideOffset={7} align="end">
          {items.map((item) => (
            <Popover.Close
              key={item.label}
              className="menu-item"
              onClick={item.onSelect}
            >
              {item.icon}
              {item.label}
            </Popover.Close>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
export function Tabs({
  items,
  value,
  onValueChange,
}: {
  items: string[];
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className="tabs-root"
    >
      <TabsPrimitive.List className="tabs-list" aria-label="Section views">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item}
            className="tab-trigger"
            value={item}
          >
            {item}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
export function EmptyState({
  title = "Nothing here yet",
  description = "Try changing your search or filters.",
  action,
  icon,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-symbol">{icon || <Search size={22} />}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
export function LoadingSkeleton({ kind = "dashboard" }: { kind?: string }) {
  return (
    <div
      className="loading-skeleton"
      aria-busy="true"
      aria-label={`Loading ${kind}`}
    >
      <span className="sk-title" />
      <div className="sk-metrics">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <span className="sk-panel" />
      <span className="sk-panel sk-short" />
    </div>
  );
}
export function Currency({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={cn("currency-value", className)}>
      {formatCurrency(amount)}
    </span>
  );
}
export function Pagination({
  page,
  pages,
  onPage,
  size,
  onSize,
  total,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
  size: number;
  onSize: (s: number) => void;
  total: number;
}) {
  return (
    <div className="pagination-bar">
      <span>
        Showing{" "}
        <strong>
          {total === 0 ? 0 : (page - 1) * size + 1}–
          {Math.min(page * size, total)}
        </strong>{" "}
        of {total.toLocaleString()}
      </span>
      <div>
        <label>
          Rows{" "}
          <select
            aria-label="Rows per page"
            value={size}
            onChange={(e) => onSize(Number(e.target.value))}
          >
            <option>8</option>
            <option>12</option>
            <option>20</option>
            <option>50</option>
          </select>
        </label>
        <div className="page-steps">
          <IconButton
            label="Previous page"
            onClick={() => onPage(Math.max(1, page - 1))}
          >
            <ChevronLeft size={16} />
          </IconButton>
          <span>
            {page} <i>/</i> {Math.max(1, pages)}
          </span>
          <IconButton
            label="Next page"
            onClick={() => onPage(Math.min(pages, page + 1))}
          >
            <ChevronRight size={16} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  danger = true,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="modal-padding">
        <div className="modal-actions">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const id = `field-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
  return (
    <label className="form-field" htmlFor={id}>
      <span className="field-label">
        {label}
        {required && <b aria-hidden="true">*</b>}
      </span>
      {children}
      {error && <small className="field-error">{error}</small>}
      {hint && !error && <small className="field-hint">{hint}</small>}
    </label>
  );
}
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cn("switch-control", checked && "is-on")}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}
export function NumberText({ value }: { value: number }) {
  return <span className="tabular">{value.toLocaleString("en-US")}</span>;
}
export function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  return sorted === "asc" ? (
    <ChevronUp size={13} />
  ) : sorted === "desc" ? (
    <ChevronDown size={13} />
  ) : (
    <span className="sort-arrows">↕</span>
  );
}
export const useClientStorage = (key: string, fallback: boolean) => {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) startTransition(() => setValue(stored === "true"));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
};
export function ProgressBar({
  value,
  color = "amber",
}: {
  value: number;
  color?: string;
}) {
  const width = Math.min(Math.max(value, 0), 100);
  return (
    <div
      className={`progress-track progress-${color}`}
      role="progressbar"
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ "--progress": `${width}%` } as CSSProperties} />
    </div>
  );
}
export function ExpandableText({
  children,
  label = "Show details",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="expand-button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide" : label}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}
