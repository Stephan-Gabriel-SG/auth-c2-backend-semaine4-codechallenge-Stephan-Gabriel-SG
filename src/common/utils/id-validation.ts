export function isValidNumericId(id: any): boolean {
  return Number.isInteger(id) && id > 0;
}
