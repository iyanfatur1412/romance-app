let cekBlokir = setInterval(function() {
    if(window.innerWidth > window.innerHeight) {
        blockPerangkat();
    } else {
        // clearInterval(cekBlokir);
        hapusBlokir();
    }
})

const audio = document.querySelector("audio");
audio.play();

const board = document.querySelector(".board");
let next;
let scene = 1;
let message = {
    pilihan: "",
    kalimat: ""
}

scene1();



board.addEventListener("click", function(e) {
    if(next) {
        if(scene == 2) {
            fadeOut("fromLeft");
            next = false;
            setTimeout(scene2, 700);
        } else if(scene == 3) {
            fadeOut("fromRight");
            next = false;
            scene3();
        } else if(scene == 5) {
            board.innerHTML = "";
            next = false;
            scene5();
        } else if(scene == 6) {
            fadeOut("fromLeft2");
            next = false;
            setTimeout(scene6, 1000);
        }
        scene++
    }
}) 





function scene1() {
    board.innerHTML = elScene("chara_scene_1.png", "img-left");
    setTimeout(function() {
        animasiKata(`Halo, 
Septiajayani....`);
    }, 1000)
    const chara = document.querySelector(".board img");
    chara.classList.add("fromLeft");
    scene = 2;
}


function scene2() {
    board.innerHTML = elScene("chara_scene_2.png", "img-right");
    setTimeout(function() {
        animasiKata(`Maafin Aa yang selalu
seperti ini....  :(`);
    }, 1000)
    const chara = document.querySelector(".board img");
    const bubleText = document.querySelector(".board .buble-text");
    bubleText.style.left = "30px";
    bubleText.style.right = "unset";
    chara.classList.add("fromRight");
}

function scene3() {
    const data = elScene3();
    board.innerHTML = elScene3();
    setTimeout(function() {
        const maaf = document.querySelector(".col-maaf");
        maaf.classList.add("activeScene3");
    }, 600)
    setTimeout(function() {
        const question = document.querySelector(".col-question");
        question.classList.add("activeScene3");
    }, 2000);
    setTimeout(function() {
        const colButton = Array.from(document.querySelectorAll(".col-pilihan button"));
        colButton.forEach((btn, i) => {
            setTimeout(function() {
                btn.classList.add("activeScene3");
            }, (i+1) * 1000);
        })
        colButton.map(btn => btn.addEventListener("click", function() {
            if(btn.getAttribute("name") == "lopiu") {
                board.innerHTML = "";
                next = false;
                scene5();
                scene = 6;
            } else {
                message.pilihan = btn.getAttribute("name");
                board.innerHTML = "";
                scene4(message.pilihan, btn.innerHTML);
            }
        }))
    }, 2200)
}


function scene4(data, value) {
    let pilihan;
    board.innerHTML = elScene4();
    setTimeout(function() {
        const title = document.querySelector(".title");
        title.textContent = value;
        title.classList.add("activeScene4");
    }, 500)
    setTimeout(function() {
        const slider = document.querySelector(".slider");
        slider.classList.add("activeScene4");
    }, 1000)
    setTimeout(function() {
        const sliderValue = document.querySelector(".slider .value");
        if(data == "kesal") {
            pilihan = "40%"
        } else if(data == "marah") {
            pilihan = "60%";
        } else if(data == "sangat-kesal") {
            pilihan = "90%";
        } else if(data == "sangat-marah") {
            pilihan = "100%"
        }
        sliderValue.style.width = pilihan;
    }, 1500)
    next = true;
    scene = 4;
}

function scene5() {
    board.innerHTML = elScene("chara_scene_5.png", "img-left");
    setTimeout(function() {
        animasiKata(`Maaf selalu membuat Neng menunggu dan
"TERIMA KASIH"
Lopiuuu...`);
    }, 1000)
    const chara = document.querySelector(".board img");
    chara.classList.add("fromLeft2");
}

function scene6() {
    board.innerHTML = elScene6();
    const btn = document.querySelector(".btn-send");
    btn.addEventListener("click", function(e) {
       e.preventDefault();
       audio.pause();
       message.kalimat = board.firstElementChild.firstElementChild.value;
       let pesan = `Neng Tia sedang ${message.pilihan}, ini pesannya : ${message.kalimat}`;
        window.open(`https://wa.me/6289604426520?text=${pesan}`, "_blank");
    });
}


function blockPerangkat() {
    const blokir = document.querySelector(".blokir");
    blokir.classList.add("activeBlokir");
}

function hapusBlokir() {
    const blokir = document.querySelector(".blokir");
    blokir.classList.remove("activeBlokir");
}











function fadeOut(name) {
    const chara = document.querySelector(".board img");
    const bubleText = document.querySelector(".buble-text");
    chara.classList.toggle(name);
    bubleText.classList.toggle("fadeOut");
}


function animasiKata(words) {
    let count = 0;
    const bubleText = document.querySelector(".buble-text");
    let setTimer = setInterval(function() {
        if(count < words.length) {
            next = false;
            let span = document.createElement("span");
            span.append(words.charAt(count));
            bubleText.appendChild(span);
            count++;
        } else {
            clearInterval(setTimer);
            next = true;
        }
    }, 50)
}

function elScene(img, name) {
    return `
        <div class=${name}>
            <img src="img/${img}" alt="character">
        </div>
        <div class="buble-text">
        </div>
    `
}

function elScene3() {
    return ` <div class="col-maaf">
                <p>Maaf Aa belum bisa memberikan yang terbaik buat neng... :(</p>
            </div>
            <div class="col-question">
                <p>Bagaimana Perasaan neng?</p>
            </div>
            <div class="col-pilihan">
                <button type="submit" name="kesal">Kesal!</button>
                <button type="submit" name="sangat-kesal">Sangat Kesal!!</button>
                <button type="submit" name="marah">Marah!</button>
                <button type="submit" name="sangat-marah">Sangat Marah!!</button>
                <button type="submit" name="lopiu" class="lopiu">Aa Sayang Neng <br> (Lopiu)</button>
            </div>`
}


function elScene4() {
    return `
        <h2 class="title">Marah</h2>
            <div class="slider">
            <div class="value">

            </div>
        </div>
    `
}


function elScene6() {
    return `
        <div class="form">
            <textarea type="" name="pesan" class="pesan" placeholder="Sampaikan Unek unek neng buat Aa, rangkai dalam kalimat..." autofocus></textarea>
            <button type="submit"><a href="" class="btn-send">Kirim</a></button>
        </div>
    `
}
