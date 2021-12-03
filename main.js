const frontBoardContainer = document.querySelector(".front-board");
const backBoardContainer = document.querySelector(".back-board");
const dataBoardContainer = document.querySelector(".data-board");

const board = (tech,progress) => {
    const template = `
       <div class="box">
         <div class="text">
           <h3>${tech}</h3>
             <p>${progress}</p>
          </div>
        <div class="line">
          <div style="width:${progress}" class="progress"></div>
        </div>
      </div>
    `
    return template;
}

// front end tech
frontBoardContainer.innerHTML += board("HTML","80%");
frontBoardContainer.innerHTML += board("CSS","50%");
frontBoardContainer.innerHTML += board("JavaScript","80%");
frontBoardContainer.innerHTML += board("React","60%");

// back end tech
backBoardContainer.innerHTML += board("NodeJS","80%");
backBoardContainer.innerHTML += board("Express","75%");

// database tech
dataBoardContainer.innerHTML += board("MongoDB","60%");
dataBoardContainer.innerHTML += board("MySQL","50%");