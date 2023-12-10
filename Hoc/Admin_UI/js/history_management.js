const SIZE = 6;

var userHistory = [];
var currPage = 0;
var sales;

async function getKhuyenMaiInfo() {
  try {
    await $.ajax("http://localhost:3001/history/sales", {
      beforeSend: (req) => {
        req.setRequestHeader(
          "Authorization",
          `Bearer ${Cookies.get("accessToken")}`
        );
      },
      success: (data) => {
        sales = data;
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProductBySaleID(id_sale) {
  try {
    await $.ajax({
      url: `http://localhost:3001/history/sales/${id_sale}`,
      method: "get",
      beforeSend: function (req) {
        req.setRequestHeader(
          "Authorization",
          "Bearer: " + Cookies.get("accessToken")
        );
      },
      success: (result) => {
        console.log(result);
        userHistory = result;
      },
      error: (err) => {},
    });
  } catch (err) {
    console.log(err);
  }
}

async function getPrintingInfo() {
  try {
    await $.ajax({
      url: "http://localhost:3001/history/",
      method: "get",
      beforeSend: function (req) {
        req.setRequestHeader(
          "Authorization",
          "Bearer: " + Cookies.get("accessToken")
        );
      },
      success: (result) => {
        console.log(result);
        userHistory = result;
      },
      error: (err) => {},
    });
  } catch (err) {
    console.log(err);
  }
}

async function displayHistory() {
  console.log(sales);
  $("tbody").html("");
  if (userHistory.length == 0) return;
  console.log(1111);
  while (currPage * SIZE >= userHistory.length) currPage--;
  if (currPage < 0) currPage = 0;
  let begin = currPage * SIZE;
  let end = Math.min((currPage + 1) * SIZE, userHistory.length);
  for (let i = begin; i < end; i++) {
    let data = userHistory[i];
    console.log(data);
    let row = $('<tr class="my-2"></tr>');
    row.append(
      $(`<td class="Montserrat">
  				${data["ma san pham"]}
              </td>`)
    );
    row.append($(`<td>${data["ten san pham"]}</td>`));
    row.append($(`<td>${data["so luong"]}</td>`));

    $("tbody").append(row);
  }
  $("#pageNumber").val(currPage + 1);
}

$(document).ready(async function () {
  $("#menu").html(getMenuContent());
  $("#account_bar").html(getAccountBarContent());
  $("#history_button").css("background-color", "#C8C2F2");
  $("#logo").click(function () {
    window.location.href = "home_admin.html";
  });

  await getKhuyenMaiInfo();

  // Get the <select> element by its ID
  var selectElement = document.getElementById("mySelect");

  // Loop through the array and create an <option> element for each item
  for (var i = 0; i < sales.length; i++) {
    var option = document.createElement("option");
    option.id = sales[i]["ma khuyen mai"];
    option.value =
      sales[i]["ma khuyen mai"] + " - " + sales[i]["ten chuong trinh"]; // Set the value attribute of the option
    option.text =
      sales[i]["ma khuyen mai"] + " - " + sales[i]["ten chuong trinh"]; // Set the text content of the option
    selectElement.add(option); // Append the option to the <select> element
  }

  // Add a change event listener to the <select> element
  selectElement.addEventListener("change", async function () {
    await getProductBySaleID(selectElement.value.split(" - ")[0]);
    await displayHistory();
  });

  $("#nextPage").click(async function () {
    currPage++;
    displayHistory();
  });

  $("#previousPage").click(async function () {
    currPage--;
    displayHistory();
  });

  $("#gotoPage").click(async function () {
    currPage = $("#pageNumber").val();
    displayHistory();
  });

  $("#pageNumber").keydown(function (e) {
    if (e.which == 13 && !$(".printer-history").is(":hidden")) {
      $("#gotoPage").click();
    }
  });
});
