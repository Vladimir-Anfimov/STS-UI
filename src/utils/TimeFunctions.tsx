export function DateFullFormat(time: string) {
  let timeParts = time.split("T");
  const yearParts = timeParts[0].split("-");

  return `${timeParts[1].slice(0, 5)} ${yearParts[2]}/${yearParts[1]}/${
    yearParts[0]
  }`;
}
