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


function colorCodeTimeBlocks() {
    const now = dayjs();
    const currentHour = now.hour();
 
    $('.row').each(function() {
        const timeBlockHour = parseInt($(this).find('.col-2').text());
        if (timeBlockHour < currentHour) {
            $(this).addClass('past').removeClass('present future');
        } else if (timeBlockHour === currentHour) {
            $(this).addClass('present').removeClass('past future');
        } else {
            $(this).addClass('future').removeClass('past present');
        }
    });
 }
 
 function saveEvent() {
    $('.save-btn').on('click', function() {
        const eventInput = $(this).siblings('.event-input');
        const eventText = eventInput.val();
        const timeBlockId = eventInput.attr('id');
        localStorage.setItem(timeBlockId, eventText);
    });
}

function loadSavedEvents() {
    $('.event-input').each(function() {
        const timeBlockId = $(this).attr('id');
        const savedEvent = localStorage.getItem(timeBlockId);
        if (savedEvent) {
            $(this).val(savedEvent);
        }
    });
}