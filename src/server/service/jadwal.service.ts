import { AppRepositoryMap, JadwalRepository } from "../../contract/repository.contract";
import { JadwalService } from "../../contract/service.contract";
import { JadwalAttribute, JadwalChange_Payload } from "../dto/jadwal.dto";
import { BaseService } from "./base.service";

export class Jadwal extends BaseService implements JadwalService {
    private jadwalRepo!: JadwalRepository;
    init(repository: AppRepositoryMap): void {
        this.jadwalRepo = repository.jadwal;
    }

    getJadwal = (): JadwalAttribute => {
        return this.jadwalRepo.getJadwal();
    };

    setJadwal = (payload: JadwalChange_Payload): void => {
        this.jadwalRepo.setJadwal(payload.hari, payload.name);
    };
}
