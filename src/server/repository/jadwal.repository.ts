import { JadwalAttribute, JadwalHariAttribute } from "../dto/jadwal.dto";

export class MemoryJadwalRepository {
    private map: JadwalAttribute = {
        senin: "unkown",
        selasa: "unkown",
        rabu: "unkown",
        kamis: "unkown",
        jumat: "unkown",
        sabtu: "unkown",
        minggu: "unkown",
    };

    getJadwal = (): JadwalAttribute => {
        return this.map;
    };

    setJadwal = (hari: JadwalHariAttribute, name: string): void => {
        // eslint-disable-next-line security/detect-object-injection
        this.map[hari] = name;
    };
}
