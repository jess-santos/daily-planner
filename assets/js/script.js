$(document).ready(function() {
    generateTimeBlocks();
    colorCodeTimeBlocks();
    saveEvent();
    loadSavedEvents();
});

function generateTimeBlocks() {
    const container = $('.container');
    for (let i = 9; i <= 17; i++) {
        const timeBlock = `
            <div class="row">
                <div class="col-2">${i}:00</div>
                <div class="col-8"><textarea class="event-input" id="event-input-${i}"></textarea></div>
                <div class="col-2"><button class="save-btn">Save</button></div>
            </div>
        `;
        container.append(timeBlock);
    }
}

