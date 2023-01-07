export function paginate<T>(items: T[], pageNumber: number, pageSize: number): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
