const API_BASE = "https://api.airtable.com/v0";

export type AirtableFields = Record<string, unknown>;

export type AirtableRecord<T extends AirtableFields = AirtableFields> = {
    id: string;
    fields: T;
};

function getAirtableApiKey(): string {
    const key = process.env.AIRTABLE_API_KEY;
    if (!key) throw new Error("AIRTABLE_API_KEY is not set");
    return key;
}

function getAirtableBaseId(): string {
    const id = process.env.AIRTABLE_BASE_ID;
    if (!id) throw new Error("AIRTABLE_BASE_ID is not set");
    return id;
}

async function airtableRequest<T>(
    table: string,
    path: string,
    init?: RequestInit,
): Promise<T> {
    const url = `${API_BASE}/${getAirtableBaseId()}/${encodeURIComponent(table)}${path}`;

    const res = await fetch(url, {
        ...init,
        headers: {
            Authorization: `Bearer ${getAirtableApiKey()}`,
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Airtable request failed (${res.status}): ${body}`);
    }

    return res.json() as Promise<T>;
}

export async function listRecords<T extends AirtableFields = AirtableFields>(
    table: string,
): Promise<AirtableRecord<T>[]> {
    const records: AirtableRecord<T>[] = [];
    let offset: string | undefined;

    do {
        const params = new URLSearchParams();
        if (offset) params.set("offset", offset);
        const query = params.toString() ? `?${params.toString()}` : "";

        const page = await airtableRequest<{
            records: AirtableRecord<T>[];
            offset?: string;
        }>(table, query);

        records.push(...page.records);
        offset = page.offset;
    } while (offset);

    return records;
}

export async function getRecord<T extends AirtableFields = AirtableFields>(
    table: string,
    recordId: string,
): Promise<AirtableRecord<T>> {
    return airtableRequest<AirtableRecord<T>>(table, `/${recordId}`);
}

function escapeAirtableFormulaValue(value: string): string {
    return value.replace(/'/g, "\\'");
}

export async function findRecordByField<T extends AirtableFields = AirtableFields>(
    table: string,
    field: string,
    value: string,
): Promise<AirtableRecord<T> | null> {
    const formula = `{${field}}='${escapeAirtableFormulaValue(value)}'`;
    const params = new URLSearchParams({
        filterByFormula: formula,
        maxRecords: "1",
    });

    const page = await airtableRequest<{ records: AirtableRecord<T>[] }>(
        table,
        `?${params.toString()}`,
    );

    return page.records[0] ?? null;
}

export async function findRecordByNumberField<T extends AirtableFields = AirtableFields>(
    table: string,
    field: string,
    value: number,
): Promise<AirtableRecord<T> | null> {
    const formula = `{${field}}=${value}`;
    const params = new URLSearchParams({
        filterByFormula: formula,
        maxRecords: "1",
    });

    const page = await airtableRequest<{ records: AirtableRecord<T>[] }>(
        table,
        `?${params.toString()}`,
    );

    return page.records[0] ?? null;
}

export async function updateRecord<T extends AirtableFields = AirtableFields>(
    table: string,
    recordId: string,
    fields: Partial<T>,
): Promise<AirtableRecord<T>> {
    return airtableRequest<AirtableRecord<T>>(table, `/${recordId}`, {
        method: "PATCH",
        body: JSON.stringify({ fields }),
    });
}

export async function createRecords<T extends AirtableFields = AirtableFields>(
    table: string,
    fieldsArray: T[],
): Promise<AirtableRecord<T>[]> {
    const created: AirtableRecord<T>[] = [];

    for (let i = 0; i < fieldsArray.length; i += 10) {
        const batch = fieldsArray.slice(i, i + 10);
        const page = await airtableRequest<{ records: AirtableRecord<T>[] }>(
            table,
            "",
            {
                method: "POST",
                body: JSON.stringify({
                    records: batch.map((fields) => ({ fields })),
                }),
            },
        );
        created.push(...page.records);
    }

    return created;
}
