const randomColor = () => '#' + Math.random().toString(16).substr(-6)
const changeColor = () => {
    var color = randomColor();
    document.getElementById("sideNav").style.backgroundColor = color;
    document.getElementById("jzh1").style.color = color;
    document.getElementById("jzh2").style.color = color;
    document.getElementById("jzh31").style.color = color;
    document.getElementById("jzh32").style.color = color;
    document.getElementById("jzh33").style.color = color;

    var dColor = ColorLuminance(color, -0.5);
    document.getElementById("aboutA").style.backgroundColor = dColor;
    document.getElementById("awaA").style.backgroundColor = dColor;
    document.getElementById("intA").style.backgroundColor = dColor;
    document.getElementById("skillA").style.backgroundColor = dColor;
    document.getElementById("expA").style.backgroundColor = dColor;
    document.getElementById("eduA").style.backgroundColor = dColor;
}



function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

document.getElementById("profileHolder").addEventListener("click", function() {
    playLogoAnim();
});

function playLogoAnim() {
    document.getElementById("jzh1").classList.remove("anim");
    void document.getElementById("jzh1").offsetWidth;
    document.getElementById("jzh1").classList.add("anim");

    document.getElementById("jzh2").classList.remove("anim");
    void document.getElementById("jzh2").offsetWidth;
    document.getElementById("jzh2").classList.add("anim");

    document.getElementById("jzh31").classList.remove("anim");
    void document.getElementById("jzh31").offsetWidth;
    document.getElementById("jzh31").classList.add("anim");

    document.getElementById("jzh32").classList.remove("anim");
    void document.getElementById("jzh32").offsetWidth;
    document.getElementById("jzh32").classList.add("anim");

    document.getElementById("jzh33").classList.remove("anim");
    void document.getElementById("jzh33").offsetWidth;
    document.getElementById("jzh33").classList.add("anim");
}

function init() {
    setInterval(() => {
        changeColor()
    }, 5000)


    playLogoAnim();
    changeColor();
}

init();