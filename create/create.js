import { createParticipant, getWorkshops } from '../fetch-utils.js';
import { renderOption } from '../render-utils.js';

const workshopSelect = document.getElementById('workshops');
const participantForm = document.getElementById('new-participant');

async function onLoad() {
    const workshops = await getWorkshops();
    for (let workshop of workshops) {
        const workshopOption = renderOption(workshop);
        workshopSelect.append(workshopOption);
    }
}
onLoad();

