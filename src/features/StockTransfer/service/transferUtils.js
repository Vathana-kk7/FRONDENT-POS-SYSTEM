import { stockdataCardData } from "../StockTransferRequest/data/stockdata";

export function createInitialTransferCards() {
  return stockdataCardData.map((card, index) => ({
    ...card,
    id: index + 1,
  }));
}

export function exportTransfers(rows) {
  if (!rows.length) return false;

  const columns = [
    ["Transfer No", (row) => row.transfer_no],
    ["From Warehouse", (row) => row.source_warehouse?.name],
    ["To Warehouse", (row) => row.destination_warehouse?.name],
    ["Transfer Date", (row) => row.created_at],
    ["Expected Date", (row) => row.expected_date],
    ["Items", (row) => row.items?.length ?? 0],
    ["Status", (row) => row.status],
    ["Requested By", (row) => row.requester?.name],
  ];
  const escapeCell = (value) => {
    let text = String(value ?? "");
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const content = [
    columns.map(([title]) => escapeCell(title)).join(","),
    ...rows.map((row) => columns.map(([, getValue]) => escapeCell(getValue(row))).join(",")),
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `stock-transfers-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);

  return true;
}
