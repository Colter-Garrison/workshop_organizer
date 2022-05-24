import { checkAuth, getWorkshops, logout, deleteParticipant } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

const logOut = document.getElementById('log-out');

checkAuth();
logOut.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    const main = document.querySelector('main');
    main.textContent = ' ';
    const data = await getWorkshops();
    for (let workshop of data) {
        const workshopEl = renderWorkshop(workshop);

        const ul = document.createElement('ul');
        for (let participant of workshop.participants) {
            const li = document.createElement('li');
            li.textContent = `${participant.name}: ${participant.contact_info}`;
            li.addEventListener('click', async () => {
                await deleteParticipant(participant.id);
                await displayWorkshops();
            });
            ul.append(li);
        }
        workshopEl.append(ul);
        main.append(workshopEl);
    }
}
displayWorkshops();