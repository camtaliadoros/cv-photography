const API = "https://api.airtable.com/v0";

export interface AirtableResult {
  ok: boolean;
  id?: string;
}

function config(tableEnv: "AIRTABLE_TABLE_ID" | "AIRTABLE_SUBSCRIBERS_TABLE_ID") {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env[tableEnv];
  if (!token || !baseId || !tableId) return null;
  return { token, baseId, tableId };
}

/** Finds an existing record by an exact field match, or returns null. */
export async function findRecord(
  tableEnv: "AIRTABLE_TABLE_ID" | "AIRTABLE_SUBSCRIBERS_TABLE_ID",
  field: string,
  value: string,
): Promise<string | null> {
  const cfg = config(tableEnv);
  if (!cfg) return null;

  const formula = `LOWER({${field}}) = "${value.toLowerCase().replace(/"/g, '\\"')}"`;
  const url = `${API}/${cfg.baseId}/${cfg.tableId}?filterByFormula=${encodeURIComponent(
    formula,
  )}&maxRecords=1`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { records?: { id: string }[] };
    return data.records?.[0]?.id ?? null;
  } catch (error) {
    console.error("Airtable lookup failed:", error);
    return null;
  }
}

export async function createRecord(
  tableEnv: "AIRTABLE_TABLE_ID" | "AIRTABLE_SUBSCRIBERS_TABLE_ID",
  fields: Record<string, unknown>,
): Promise<AirtableResult> {
  const cfg = config(tableEnv);
  if (!cfg) {
    console.warn(`Airtable not configured for ${tableEnv} — skipping write`);
    return { ok: false };
  }

  try {
    const res = await fetch(`${API}/${cfg.baseId}/${cfg.tableId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, fields }),
    });

    if (!res.ok) {
      console.error("Airtable create failed:", JSON.stringify(await res.json()));
      return { ok: false };
    }

    const data = (await res.json()) as { id: string };
    return { ok: true, id: data.id };
  } catch (error) {
    console.error("Airtable create request failed:", error);
    return { ok: false };
  }
}

export async function updateRecord(
  tableEnv: "AIRTABLE_TABLE_ID" | "AIRTABLE_SUBSCRIBERS_TABLE_ID",
  recordId: string,
  fields: Record<string, unknown>,
): Promise<AirtableResult> {
  const cfg = config(tableEnv);
  if (!cfg) return { ok: false };

  try {
    const res = await fetch(`${API}/${cfg.baseId}/${cfg.tableId}/${recordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, fields }),
    });

    if (!res.ok) {
      console.error("Airtable update failed:", JSON.stringify(await res.json()));
      return { ok: false };
    }
    return { ok: true, id: recordId };
  } catch (error) {
    console.error("Airtable update request failed:", error);
    return { ok: false };
  }
}
