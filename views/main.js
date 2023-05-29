let item_list = document.getElementById("items");
const api =
  "https://crudcrud.com/api/ae4c8ee1a9184b63b203074653c9a1e9/expensetracker";
let update_item_id = null;
(async function () {
  try {
    var res = await axios.get(`${api}`);
  } catch (e) {
    console.log(e);
  } finally {
    show_expense(res.data);
  }
})();
function post_expense() {
  let expense_details = {};
  let all_inputs = Array.from(document.getElementsByClassName("input"));
  all_inputs.forEach(
    (element) =>
      (expense_details = {
        ...expense_details,
        [element.name]: element.value,
      })
  );
  if (!update_item_id) {
    (async function () {
      try {
        var res = await axios.post(`${api}`, expense_details);
      } catch (e) {
        console.log(e);
      } finally {
        show_expense([res.data]);
      }
    })();
  } else {
    (async function () {
      try {
        await axios.put(`${api}/${update_item_id}`, expense_details);
        var res = await axios.get(`${api}/${update_item_id}`);
      } catch (e) {
        console.log(e);
      } finally {
        show_expense([res.data]);
        update_item_id = null;
      }
    })();
  }
}
function show_expense(arr) {
  arr.forEach((obj) => {
    let item = document.createElement("li");
    item.setAttribute("id", `${obj._id}`);
    let delete_btn = document.createElement("button");
    let edit_btn = document.createElement("button");
    item.textContent = `${obj.amount}-${obj.description}-${obj.category}`;
    delete_btn.textContent = "Delete";
    edit_btn.textContent = "Edit";
    delete_btn.addEventListener("click", delete_expense);
    edit_btn.addEventListener("click", edit_expense);
    item_list.appendChild(item);
    item.appendChild(delete_btn);
    item.appendChild(edit_btn);
  });
}
function delete_expense(e) {
  (async function () {
    try {
      await axios.delete(`${api}/${e.target.parentNode.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      e.target.parentNode.remove();
    }
  })();
}
function edit_expense(e) {
  (async function () {
    try {
      var res = await axios.get(`${api}/${e.target.parentNode.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      Object.keys(res.data).forEach((key) =>
        key != "_id"
          ? (document.getElementById(`${key}`).value = res.data[`${key}`])
          : ""
      );
      update_item_id = e.target.parentNode.id;
      e.target.parentNode.remove();
    }
  })();
}
