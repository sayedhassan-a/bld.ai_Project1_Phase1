const upd = function () {
  event.preventDefault();
  const item = document.getElementsByClassName("pers-course-item");
  let fnd = " " + document.getElementById("search-item").value.toLowerCase();

  for (let i = 0; i < 5; i++) {
    let st = item[i].getElementsByTagName("h3")[0].innerHTML;
    st = " " + st.toLowerCase();
    if (st.search(fnd) == -1) {
      item[i].style.display = "none";
    } else {
      item[i].style.display = "initial";
    }
  }
};
const add = function (item, child) {
  let space = document.createTextNode(" ");

  item.appendChild(child);
  item.appendChild(space);
};
const view = function () {
  link = "http://localhost:3000/content";
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      let keys = Object.keys(data);
      for (let i in keys) {
        let el = document.getElementById(keys[i]);
        let desc = document.createElement("div");
        desc.className = "pers-courses-desc";
        cur = document.createElement("div");
        cur.className = "pers-courses-display";
        cur.id = "disp";
        add(el, desc);
        add(el, cur);

        console.log(el);
        let title = document.createElement("h2");
        let header = document.createElement("p");
        title.innerHTML = data[keys[i]].title;
        header.innerHTML = data[keys[i]].header;
        add(desc, title);
        add(desc, header);
        for (let j of data[keys[i]].courses) {
          let item = j;
          let art = document.createElement("article");
          let img = document.createElement("img");
          let heading = document.createElement("h3");
          let author = document.createElement("p");
          let rate = document.createElement("span");
          let watched = document.createElement("span");
          let price = document.createElement("p");
          let final = document.createElement("s");

          art.className = "pers-course-item";
          img.className = "pers-course";
          heading.className = "pers-heading";
          author.className = "pers-author";
          rate.className = "pers-rate pers-rate-num";
          watched.className = "pers-watched";
          price.className = "pers-price";

          img.src = item.image;
          heading.innerHTML = item.headline;
          author.innerHTML = item.instructors[0].name;
          let x = parseFloat(item.rating);
          x = x.toFixed(1);
          let y = parseFloat(x).toFixed();
          if (y == x) x = x.toFixed();
          rate.innerHTML = x;
          price.innerHTML = "E£" + item.price + "  ";

          add(art, img);
          add(art, heading);
          add(art, author);
          add(art, rate);
          for (let i = 0; i < 5; i++) {
            let s = document.createElement("span");
            if (x > 0.5) {
              s.className = "fa fa-star pers-rate";
            } else if (x > 0) {
              s.className = "fa fa-star-half-empty pers-rate";
            } else {
              s.className = "fa fa-star";
            }
            x--;
            add(art, s);
          }
          add(art, watched);
          add(art, price);
          let car = document.createElement("div");
          car.className = "";
          add(cur, art);
        }
      }
    });
};
