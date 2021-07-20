export function reorder<A>(
  list: Array<A>,
  startIndex: number,
  endIndex: number
): Array<A> {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
