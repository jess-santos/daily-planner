$(document).ready(function() {
    generateTimeBlocks();
    colorCodeTimeBlocks();
    saveEvent();
    loadSavedEvents();
});

const currentDate = dayjs().format('MMMM D, YYYY');
$('#currentDay').text(currentDate);


function generateTimeBlocks() {
    const container = $('.container');
    for (let i = 9; i <= 17; i++) {
        const timeBlock = `
        <div class="row">
        <div class="col-2">${i}:00</div>
        <div class="col-8"><textarea class="event-input" id="event-input-${i}"></textarea></div>
        <div class="col-2">
            <button class="save-btn"><i class="fas fa-save"></i></button> 
        </div>
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
        const eventInputId = $(this).closest('.row').find('.event-input').attr('id');
        const eventText = $(this).closest('.row').find('.event-input').val();
        localStorage.setItem(eventInputId, eventText);
        showSuccessMessage("Event saved successfully!");
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

function showSuccessMessage(message) {
    const successMessage = $('#success-message');
    successMessage.text(message);
    successMessage.fadeIn(500).delay(2000).fadeOut(500);
}

