const imgs = document.querySelectorAll('.slider-container img');
const slideNumber = document.getElementById('slide-number');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


// Counter.
let counter = 0;

// Number of Images
const imgsLength = imgs.length;

// Add Parent Of List
const ulList = document.createElement('ul');

// Set An Id To Ul.
ulList.setAttribute('id', 'ulIndicator');

// Create btns
for (let i = 0; i < imgsLength; i++) {
    let indicatorItem = document.createElement("li");
    // Add Data-index
    indicatorItem.setAttribute('data-index', i+1);
    // indicatorItem.setAttribute('data-index', counter++);

    // Set Item Content.
    indicatorItem.appendChild(document.createTextNode(indicatorItem.dataset.index));

    // Add To Body.
    ulList.appendChild(indicatorItem);
}

// Append li Elements To ul.
document.querySelector('.indicators').appendChild(ulList);

// save ul in variable
let paginationCreatedUL = document.getElementById('ulIndicator');

// Pagination Items
let bulletsItems = document.querySelectorAll('#ulIndicator li');

// Trigger The checker Function.
checker();


// Checker Function.
function checker() {
    // Set SlideNumber.
    slideNumber.textContent = `slider #${counter+1} of ${imgsLength}`;

    // Remove All Active Classes
    removeAllActiveClasses();

    // Set Active Class On Images.
    imgs[counter++].classList.add('active');
    
    // Set Active Class On li's.
    paginationCreatedUL.children[--counter].classList.add('active');

    // Disabled Previous And Next Buttun.
    disabledPrevAndNextBtn ()
}

// Disabled Previous And Next Buttun.
function disabledPrevAndNextBtn () {
    // Add Disable Class To PrevBtn.
    if (counter == 0) {
        prevBtn.classList.add("disabled");
    } else {
        prevBtn.classList.remove("disabled")
    }
    
    // Add Disable Class To NextBtn.
    if (counter == 5) {
        nextBtn.classList.add("disabled");
    } else {
        nextBtn.classList.remove("disabled");
    };

    // Add Disable Class To PrevBtn & NextBtn.
    document.querySelectorAll('#ulIndicator li').forEach((li) => {
        li.addEventListener('click', (e) => {
            counter = e.target.dataset.index - 1;
            checker();
        });
    })
};

    // Remove All Active Classes
function removeAllActiveClasses () {
    // Remove Active Images.
    imgs.forEach((img) => {
        img.classList.remove('active');
    });
    
    // Remove Active Bullets.
    bulletsItems.forEach((bullet) => {
        bullet.classList.remove('active');
    });
};

// Add Active Class On Target Li.
document.querySelectorAll('#ulIndicator li').forEach((li) => {
    li.addEventListener('click', (e) => {
        // Set SlideNumber.
        slideNumber.textContent = `slider #${e.target.dataset.index} of ${imgsLength}`
        
        // Remove All Classes.
        removeAllActiveClasses();

        // Set Active Class On Images.
        imgs[e.target.dataset.index - 1].classList.add('active');
        
        // Set Active Class On li's.
        paginationCreatedUL.children[e.target.dataset.index - 1].classList.add('active');

        // Disabled Previous And Next Buttun.
        disabledPrevAndNextBtn ()
    });
});

// Previous
prevBtn.onclick = function () {
    if (prevBtn.classList.contains('disabled')) {
        return;
    } else {
        counter--;
        checker();
    }
};

// Next
nextBtn.onclick = function () {
    if (nextBtn.classList.contains('disabled')) {
        return;
    } else {
        counter++;
        checker();
    }
};