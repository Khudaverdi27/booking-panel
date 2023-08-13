
localStorage.clear();
const pageWrapper = document.querySelector("#pageWrapper");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const menuItems = document.querySelectorAll(".menu-item");
let currentStep = 'staff';


const users = [
  {
    id: 1,
    name: 'Alex Rosetta',
    email: 'alexyrosetta@egmail.com',
    image: 'image/Oval.png'
  },
  {
    id: 2,
    name: 'Maria July',
    email: 'mariajuly@egmail.com',
    image: 'image/Oval1.png'
  }
]


const services = [
  {
    id: 1,
    name: 'Oral hygine',
    duration: '1 hour ',
    image: 'image/Oval2.png',
    price: 50

  },
  {
    id: 2,
    name: 'Implants',
    duration: '1 hour 30 minutes',
    image: 'image/Oval3.png',
    price: 230,
  },
  {
    id: 3,
    name: 'Check up',
    duration: '1 hour 12 minutes',
    image: 'image/Oval4.png',
    price: 230,
  }
]












let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();



const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  const daysTag = document.querySelector(".days");
  const prevNextIcon = document.querySelectorAll(".icons span");
  prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });
  const currentDate = document.querySelector(".current-date");
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";
  const month = (currMonth + 1).toString().padStart(2, '0');
  const datePart = `${currYear}-${month}`
  for (let i = firstDayofMonth; i > 0; i--) {

    const dayString = (lastDateofLastMonth - i + 1).toString().padStart(2, '0')
    const dString = `${datePart}-${dayString}`
    liTag += `<li class="inactive day-item" data-date ="${dString}">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const dayString = (i).toString().padStart(2, '0')
    const dString = `${datePart}-${dayString}`
    liTag += `<li class="day-item" data-date = "${dString}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    const dayString = (i - lastDayofMonth + 1).toString().padStart(2, '0')
    const dString = `${datePart}-${dayString}`
    liTag += `<li class="inactive day-item" data-date = "${dString}">${i - lastDayofMonth + 1}</li>`
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`
  daysTag.innerHTML = liTag;
  const dayItems = document.querySelectorAll(".day-item");
  const selectedDate = document.querySelector("#selectedDate");

  const selectedDateStr = localStorage.getItem('selectedDate');

  dayItems.forEach(d => {
    const dateString = d.dataset.date;
    if (selectedDateStr == dateString) {
      d.classList.add('active')

    }
  });
  dayItems.forEach(item => {
    item.addEventListener("click", () => {
      dayItems.forEach(d => {
        d.classList.remove('active')
      });

      const day = item?.dataset.date;
      selectedDate.innerHTML = day;
      item.classList.add('active');
      localStorage.setItem('selectedDate', day);
    });

  });

}


const renderStaff = () => {
  const selectedUser = JSON.parse(localStorage.getItem('selectedUser') ?? '{}');
  prevBtn.classList.add('d-none');
  nextBtn.classList.remove('d-none');
  cnfrmBtn.classList.add('d-none');




  const innerHTML = users.map(user => {
    return `<label class="userItem" data-id="${user.id}">
    <input type="radio" ${selectedUser?.id == user.id ? 'checked' : ''} name="product" class="card-input-element" />
    <div class="checked-border  panel panel-default card-input">
      <div class="user-card userItem" data-id="${user.id}">
        <img class="user-avatar" src="${user.image}" alt="User Avatar">
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-description">${user.email}</div>
        </div>
      </div>
    </div>
  </label>
  `

  }).join('');


  pageWrapper.innerHTML = innerHTML;
  const userCards = document.querySelectorAll(".userItem");

  userCards.forEach(item => {
    item.addEventListener("click", () => {
      const selectedUser = users?.find(user => user.id == item?.dataset?.id);
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));

    });

  });
}

const renderService = () => {
  const selectedUser = localStorage.getItem('selectedUser');
  if (selectedUser) {
    currentStep = 'service';
    prevBtn.classList.remove('d-none');
    nextBtn.classList.remove('d-none');
    cnfrmBtn.classList.add('d-none');
    const selectedService = JSON.parse(localStorage.getItem('selectedService') ?? '{}');
    const innerHTML =
      services?.map((service) => {
        return `<label class="serviceItem" data-id="${service?.id}">
      <input type="radio" ${selectedService?.id == service.id ? 'checked' : ''}  name="product" class="card-input-element" />
        <div class="checked-border panel panel-default card-input">
          <div class="user-card serviceItem" >
          <img class="user-avatar" src="${service.image}" alt="User Avatar">
          <div class="user-info">
            <div class="user-name">${service.name}</div>
            <div class="user-description">${service.duration}</div>
          </div>
          <div class="price-card">${service.price}$</div>
        </div>
          </div>
    </label>
    `
      }).join('');
    pageWrapper.innerHTML = innerHTML;
    const serviceCards = document.querySelectorAll(".serviceItem");

    serviceCards.forEach(item => {
      item.addEventListener("click", () => {
        console.dir(item);
        const selectedService = services?.find(user => user.id == item?.dataset?.id);
        localStorage.setItem('selectedService', JSON.stringify(selectedService));

      });

    });
  }
  else {
    alert('please fill all required fields')
  }



}



const renderConfirm = () => {
  const selectedTimeStr = localStorage.getItem('selectedTime');
  const selectedDateStr = localStorage.getItem('selectedDate');
  const selectedUserStr = localStorage.getItem('selectedUser');
  const selectedServiceStr = localStorage.getItem('selectedService');

  if (selectedTimeStr && selectedDateStr && selectedUserStr && selectedServiceStr) {
    currentStep = 'confirm';
    prevBtn.classList.remove('d-none');
    nextBtn.classList.add('d-none');
    cnfrmBtn.classList.remove('d-none');
    const selectedUser = JSON.parse(localStorage.getItem('selectedUser') ?? '{}');

    const selectedService = JSON.parse(localStorage.getItem('selectedService') ?? '{}');
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTime = localStorage.getItem('selectedTime');



    const innerHTML = `<div class="customer-data">
    <div class="data-input">
        <label for="">First name <span>*</span></label>
        <input type="text">
    </div>
    <div class="data-input">
        <label for="">Last name <span>*</span></label>
        <input type="text">
    </div>
    <div class="data-input">
        <label for="">E-mail <span>*</span></label>
        <input type="email">
    </div>
    <div class="data-input">
        <label for="">Phone <span>*</span></label>
        <input type="tel">
    </div>
    <div class="data-note">
        <p>Note</p>
        <div class="note-box">
            <p><span>Staff:</span> ${selectedUser?.name}</p>
            <p><span>Service:</span> ${selectedService?.name}</p>
            <p> <span>Date:</span> ${selectedDate} / ${selectedTime}</p>
            <p><span>Staff:</span> <span class="cost">${selectedService?.price}$</span></p>
        </div>
    </div>
  </div>`
    pageWrapper.innerHTML = innerHTML;
  }

  else {
    alert('please select')
  }





}

const renderDateTime = () => {
  const selectedService = localStorage.getItem('selectedService');
  if (selectedService) {
    currentStep = 'dateTime';
    prevBtn.classList.remove('d-none');
    nextBtn.classList.remove('d-none');
    const selectedTimeString = localStorage.getItem('selectedTime');
    const innerHTML = `<div class="dateTime">
    <div class="wrapper">
    <header>
      <div class="icons">
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <p class="current-date"></p>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>
  <div class="wrapper-right">
    <div class="header-top" id="selectedDate">
      2023-03-04
    </div>
    <div class="time-boxes">
    <label>
    <input type="radio" ${selectedTimeString == '09:00 - 09:30' ? 'checked' : ''} name="product" class="card-input-element" />
      <div class="panel panel-default card-input">
      <div class="box" data-time="09:00 - 09:30">
        <p>09:00</p>
        <p>09:30</p>
      </div>
      </div>
        </label>
        <label>
        <input type="radio" ${selectedTimeString == '09:30 - 10:00' ? 'checked' : ''} name="product" class="card-input-element" />
          <div class="panel panel-default card-input">
          <div class="box"  data-time="09:30 - 10:00">
            <p>09:30</p>
            <p>10:00</p>
          </div>
          </div>
            </label>
            <label>
            <input type="radio" ${selectedTimeString == '10:00 - 10:30' ? 'checked' : ''} name="product" class="card-input-element" />
              <div class="panel panel-default card-input">
              <div class="box" data-time="10:00 - 10:30">
                <p>10:00</p>
                <p>10:30</p>
              </div>
              </div>
                </label>
    </div>
  </div>
  </div>`;
    pageWrapper.innerHTML = innerHTML;
    const timeCards = document.querySelectorAll(".box");

    timeCards.forEach(item => {
      item.addEventListener("click", () => {
        console.dir(item);
        const time = item?.dataset.time
        localStorage.setItem('selectedTime', time);

      });

    });
    renderCalendar();
  }

  else {
    alert('Please select')
  }



}



const pageMap = {
  staff: { self: renderStaff, next: renderService, prev: null },
  service: { self: renderService, next: renderDateTime, prev: renderStaff },
  dateTime: { self: renderDateTime, next: renderConfirm, prev: renderService },
  confirm: { self: renderConfirm, next: null, prev: renderDateTime },
}

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    currentStep = item?.id;
    pageMap[item?.id]?.self?.();

  });

});


renderStaff();

nextBtn.addEventListener("click", () => {

  pageMap?.[currentStep]?.next?.();
});


prevBtn.addEventListener("click", () => {
  pageMap?.[currentStep]?.prev?.();
});