
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

    // Project Overview
    $('p#description').html(`<p>${description}</p>`);
    
    // Project Title
    $('#projectTitle').html(title);
    
    // Project Time
    $('div#time').append(`<img src="./assets/images/calendars/${time}.png" />`);
    
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
    });

    
});

