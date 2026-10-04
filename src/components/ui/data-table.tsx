"use client";
import { useMemo, useState } from "react";
import {
  flexRender,
  type SortingState,
  type ColumnVisibilityState,
  type RowData,
} from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table/legacy";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { Columns3, Download, Search } from "lucide-react";
import { EmptyState, Pagination, SearchInput, Menu } from "./primitives";
import { downloadCSV } from "@/lib/utils";
export function DataTable<T extends RowData>({
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchValue,
  globalFilter = true,
  filename = "garagex-export",
  actions,
  toolbar,
  onSelection,
}: {
  data: T[];
  columns: LegacyColumnDef<T>[];
  searchPlaceholder?: string;
  searchValue?: string;
  globalFilter?: boolean;
  filename?: string;
  actions?: React.ReactNode;
  toolbar?: React.ReactNode;
  onSelection?: (rows: T[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [visibility, setVisibility] = useState<ColumnVisibilityState>({});
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const columnDefs = useMemo(() => columns, [columns]);
  const table = useLegacyTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setVisibility,
    state: {
      sorting,
      columnVisibility: visibility,
      rowSelection: selected,
      pagination: { pageIndex: page - 1, pageSize: size },
      globalFilter: searchValue ?? search,
    },
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(selected) : updater;
      setSelected(next);
      onSelection?.(data.filter((_, i) => next[String(i)]));
    },
    onPaginationChange: (updater) => {
      const old = { pageIndex: page - 1, pageSize: size };
      const next = typeof updater === "function" ? updater(old) : updater;
      setPage(next.pageIndex + 1);
      setSize(next.pageSize);
    },
    globalFilterFn: "includesString",
  });
  const rows = table.getRowModel().rows;
  const allColumns = table.getAllLeafColumns();
  return (
    <div className="table-root">
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          {globalFilter && (
            <SearchInput
              value={searchValue ?? search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
            />
          )}
          {toolbar}
        </div>
        <div className="table-toolbar-actions">
          {actions}
          <Menu
            label="Table tools"
            items={[
              {
                label: "Export visible rows as CSV",
                icon: <Download size={14} />,
                onClick: () =>
                  downloadCSV(
                    filename,
                    table.getFilteredRowModel().rows.map((r) => r.original),
                  ),
              },
              ...allColumns
                .filter((c) => c.id !== "select")
                .map((c) => ({
                  label: `${c.getIsVisible() ? "✓  " : ""}${typeof c.columnDef.header === "string" ? c.columnDef.header : c.id}`,
                  icon: <Columns3 size={13} />,
                  onClick: () => c.toggleVisibility(),
                })),
            ]}
          >
            <Columns3 size={16} />
          </Menu>
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-grid">
          <thead>
            {table.getHeaderGroups().map((g) => (
              <tr key={g.id}>
                {g.headers.map((h) => (
                  <th
                    key={h.id}
                    style={{
                      width: h.getSize() !== 150 ? h.getSize() : undefined,
                    }}
                  >
                    {h.isPlaceholder ? null : h.column.getCanSort() ? (
                      <button
                        className="sort-button"
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getIsSorted()
                          ? h.column.getIsSorted() === "asc"
                            ? " ↑"
                            : " ↓"
                          : " ↕"}
                      </button>
                    ) : (
                      flexRender(h.column.columnDef.header, h.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} data-selected={r.getIsSelected() || undefined}>
                {r.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <EmptyState
            title={
              data.length ? "Nothing matches those filters" : "No records yet"
            }
            description={
              data.length
                ? "Try a different search or clear a filter."
                : "Your activity will show here once you add a record."
            }
            icon={<Search size={22} />}
          />
        )}
      </div>
      <Pagination
        page={table.getState().pagination.pageIndex + 1}
        pages={table.getPageCount()}
        onPage={table.setPageIndex.bind(table)}
        size={table.getState().pagination.pageSize}
        onSize={table.setPageSize.bind(table)}
        total={table.getFilteredRowModel().rows.length}
      />
    </div>
  );
}
