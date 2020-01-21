// TODO: Allow configuration for different datasources. For now just forcing sqlite
import { getLogs, pushLog } from "../extensions/destinations/sqlite";
export default { getLogs, pushLog };
