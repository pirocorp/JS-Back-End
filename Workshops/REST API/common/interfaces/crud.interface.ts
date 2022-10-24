export interface CRUD<TInterface> {
    list: (limit: number, page: number) => Promise<TInterface[]>;
    create: (resource: any) => Promise<string>;
    putById: (id: string, resource: any) => Promise<TInterface | null>;
    readById: (id: string) => Promise<TInterface| null>;
    deleteById: (id: string) => Promise<boolean>;
    patchById: (id: string, resource: any) => Promise<TInterface| null>;
}