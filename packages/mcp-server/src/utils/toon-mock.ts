/**
 * Mock implementation of Toon encoder for testing/demo purposes
 * since the package is not yet available in public registry.
 */
export function encode(data: any): string {
  if (typeof data !== 'object' || data === null) {
    return String(data);
  }

  // Simple mock: mimic the tabular style
  // keys[N]:
  //   val1, val2
  
  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    const keys = Object.keys(data[0] || {});
    const header = `${keys.join(",")}[${data.length}]:`;
    const rows = data.map(item => keys.map(k => item[k]).join(",")).join("\n  ");
    return `${header}\n  ${rows}`;
  }

  // Object
  // key: value
  return Object.entries(data)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n");
}

