import puppeteer from "puppeteer";

const getFood = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://kafeterya.metu.edu.tr/", {
    waitUntil: "domcontentloaded",
  });

  const lunchFoods = await page.evaluate(() => {

    const lunch = document.querySelector(".view-content")

    const foodList = lunch.querySelectorAll(".thumbnail > article > header > h2 > a");

    foodListArray = Array.from(foodList).map((meals) => {
        const meal = meals.innerHTML
        return meal
    })

    return foodListArray
  });
  console.log(lunchFoods);
  


  await page.click(".views-widget");

  const days = await page.evaluate(() => {

    const datePickerWidget = document.querySelector(".ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all");

    const daysList = datePickerWidget.querySelectorAll("table > tbody > tr > td");

    daysListArray = Array.from(daysList).map((days) => {
        if ((days.innerHTML).includes("&nbsp")){
            return "0"
        }
        else{
            return days.querySelector("a").innerText;
        }
    });

    return daysListArray

  });

  for (let i = 0; i < days.length; i++) {
    if(days[i] != "0")
    switch(i%7){
        case 0:
            console.log(days[i] + ". day is Monday")
            break;
        case 1:
            console.log(days[i] + ". day is Tuesday")
            break;
        case 2:
            console.log(days[i] + ". day is Wednesday")
            break;
        case 3:
            console.log(days[i] + ". day is Thursday")
            break;
        case 4:
            console.log(days[i] + ". day is Friday")
            break;
        case 5:
            console.log(days[i] + ". day is Saturday")
            break;
        case 6:
            console.log(days[i] + ". day is Sunday")
            break;
        case 7:
            console.log(days[i] + ". day is Monday")
            break;
        default:
            console.log("not yet")
    }
  }

  console.log(days)

  await browser.close()
};
