import { Sector } from "./WorkerForm";

export const format = (sectors: Sector[]) => {
  // todo: this is called out too frequently
  const mapped = new Map<string | null, Sector[]>();

  sectors.forEach((sector) => {
    if (!mapped.has(sector.parentSectorId!)) {
      mapped.set(sector.parentSectorId!, []);
    }
    mapped.get(sector.parentSectorId!)?.push(sector);

    if (!mapped.has(sector.id)) {
      mapped.set(sector.id, []);
    }
  });
  
  return recursiveFormat(mapped, null, 0);
};

const recursiveFormat = (
  mah: Map<string | null, Sector[]>,
  key: string | null,
  level: number
) => {
  const result: any[] = [];
  mah.get(key)?.forEach((sector) => {
    result.push({
      value: sector.id,
      inputLabel: sector.name,
      dropdownLabel: "\u00A0".repeat(level * 4) + sector.name,
    });

    result.push(...recursiveFormat(mah, sector.id, level + 1));
  });

  return result;
};
