export type ApiError = { status?: number; message: string; original?: unknown };
export type Paginated<T> = { items: T[]; total: number };
