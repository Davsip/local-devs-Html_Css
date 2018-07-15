
// Modal script
$('#projectModal').on('shown.bs.modal', function (e) {
    e.preventDefault();

    // Grab reference to anchor tag clicked
    const reference = $(e.relatedTarget);

    // pull data from a tag and #tech
    const title = reference.attr('data-title');
    const numDevs = parseInt(reference.attr('data-team'));
    const description = reference.attr('data-desc');
    const time = reference.attr('data-time');
    let techArray = reference.parent().find('p#techNeeded').html().replace(/,/g, '').toLowerCase().split(' ');
    const genderArray = ["female-icon.png", "male-icon.png"];

    // Load Apply Button Attributes (when user applies)
    $('button#applyButton').attr('data-title', title). attr('data-desc', description).attr('data-tech', techArray);

    // Project Overview
    $('p#description').html(`<p>${description}</p>`);
    
    // Project Title
    $('#projectTitle').html(title);
    
    // Project Time
    $('div#time').append(`<img src="./assets/images/icons/${time}.png" />`);
    
    // Technologies
    techArray.forEach(el => {
        // symbols will not render image, so renaming (c#, c++)
        if (el === "c#") el = el.replace("#", "sharp");
        if (el === "c++") el = el.replace("++", "plusplus");
        // append
        $('div#tech').append(`<img src="./assets/images/tech/${el}.png" class="tech-icons" alt=${el} />`);
    });
    
    // Team
    for(let i = 0; i < numDevs; i++) {
        // get random number (0 or 1)
        const gender = Math.round(Math.random());
        // create img container
        const imgContainer = $('<div>').attr('class', 'img-container');
        // create img
        const devImg = $('<img>').attr('class', 'team-img').attr('src', `./assets/images/icons/${genderArray[gender]}`);
        // append img to container
        imgContainer.append(devImg);
        // append container to div
        $('div#team-display').append(imgContainer);
    }


    // Remove data when closed (otherwise it will keep appending)
    $(document).on('hidden.bs.modal', (e) => {
        $('div#time').html('');
        $('div#tech').html('<h5>Technologies</h5>');
        $('#team-display').html('');
        $('#applyButton').removeAttr('title').removeAttr('desc').removeAttr('tech');
    });

    
});

// Apply Button Scripts
$('button#applyButton').on('click', (evt) => {
    evt.preventDefault();

    // get button attrs for apply form
    const title = $('button#applyButton').attr('data-title');
    const description = $('button#applyButton').attr('data-desc');
    const tech = $('button#applyButton').attr('data-tech');



    if(!($('button#applyButton').attr('class', 'btn btn-primary disabled'))) {
        window.location.href = './apply.html';
    }


    // console.log(evt);
})


// ToolTip for Project Modal (Apply Btn)

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


// Clone applicant to team
$('.applicant-move').on('click', (e) => {
    e.preventDefault();

    // Set target
    const el = e.currentTarget.parentNode.parentNode;

    // Clone target
    let cln = el.cloneNode(true);

    // Change dropdown class
    cln.childNodes[3].childNodes[1].setAttribute('class', 'dropdown-item member-remove')

    // Change dropdown option text
    cln.childNodes[3].childNodes[1].innerHTML = 'Remove From Team';

    // Change class to remove 'show'
    cln.childNodes[3].setAttribute('class', 'dropdown-menu');

    // copy to team
    $('div#team-members').append(cln);
});

// Remove member from team
$(document).on('click', 'a.member-remove', (evt) => {
    evt.preventDefault();
    
    // remove element
    evt.currentTarget.parentNode.parentNode.remove();

});

$(document).on('click', 'a.pstage', (evt) => {

    evt.preventDefault();

    // get clicked link value
    const newVal = evt.currentTarget.id;

    // get current status value
    const currVal = evt.currentTarget.parentNode.parentNode.childNodes[1].innerHTML;

    // change clicked link value and id to currVal
    evt.currentTarget.id = currVal;
    evt.currentTarget.innerHTML = currVal;

    // change curr status to newVal (status)
    evt.currentTarget.parentNode.parentNode.childNodes[1].innerHTML = newVal;




});