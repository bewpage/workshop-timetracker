/**
 * Format time number to hours and minutes
 * @param time
 */
export function formatTime(time: number): string {
  let hours = Math.floor(time / 60);
  let minutes = time % 60;
  return (hours ? `${hours}h` : '') + ` ${minutes}m`;
}
