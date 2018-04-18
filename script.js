$(window).on("mousemove", function(e){
        var w = $(window).width();
        var h = $(window).height();
        
    var offsetX = e.pageX / w;
    var offsetY = e.pageY / h;
    
    var round_rotate;
    if(e.pageX > w/2)
        round_rotate = -offsetX*5;
    else
        round_rotate = offsetX*5;
    
    var offset = 50;
    var offsetClounds = 150;
    
    var translate = Math.round(offsetX * offset) + "px " +  Math.round(offsetY * offset) + "px";
    var translateClouds = Math.round(offsetX * offsetClounds) + "px " +  Math.round(offsetY * offsetClounds) + "px";
    
    $("body").css("backgroundPosition", translate + "," + translateClouds);
    $(".header__circle").css("transform", "rotate(" + round_rotate +"deg)");
})

$(document).ready(function(){
    if(!flag){
        count_circle = document.getElementsByClassName("count_circle")[0];
        flag = true;
    }
    var units = getArrayOfUnits();
    for(var i = 0; i< array.length; i++)
        for(var j = 0; j< units.length; j++){
            var id = Number(units[j].id.substr(-1));
            if(countChildren(id))
                units[j].style.cursor = "pointer";
            if(id == array[i].id){
                showCountCircles(units[j], id);
                changeAvatar(units[j].childNodes[1], array[i].image);
            }
        }
})

var array = [
{
  id: 0,
  name: "Darth Sidius",
  post: "Galactic emperor",
  image: "darthsidius.png",
},
{
  id: 1,
  name: "Darth Vader",
  post: "Supreme Commander",
  image: "darthvader.png",
},
{
  id: 2,
  name: "Wilhuf Tarkin",
  post: "Grand Moff",
  image: "wilhuftarkin.png",
  parent: 1
},
{
  id: 3,
  name: "Olson Krennic",
  post: "Director",
  image: "olsonkrennic.png",
  parent: 1
},
{
  id: 4,
  name: "Esmin Kesig",
  post: "Admiral",
  image: "esminkesig.png",
  parent: 1
},
{
  id: 5,
  name: "Phasma",
  post: "Captain",
  image: "phasma.png",
  parent: 2
},
{
  id: 6,
  name: "Will Shepard",
  post: "Commander",
  image: "willshepard.png",
  parent: 2
},
{
  id: 7,
  name: "Allin Prohq",
  post: "Ensign",
  image: "allinprohq.png",
  parent: 2
},
{
  id: 8,
  name: "Jah Batut",
  post: "Admiral",
  image: "jahbatut.png",
  parent: 2
},
{
  id: 9,
  name: "FN-23",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 2
},
{
  id: 10,
  name: "FN-24",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 2
},
{
  id: 11,
  name: "FN-25",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 2
},
{
  id: 12,
  name: "FN-26",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 2
},
{
  id: 13,
  name: "RN-46",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 2
},
{
  id: 13,
  name: "RN-35",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 2
},
{
  id: 14,
  name: "RN-36",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 2
},
{
  id: 15,
  name: "PN-65",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 16,
  name: "PN-66",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 17,
  name: "PN-67",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 18,
  name: "TN-11",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 19,
  name: "TN-12",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 3
},
{
  id: 20,
  name: "TN-13",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 3
},
{
  id: 21,
  name: "TN-14",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 3
},
{
  id: 22,
  name: "WN-23",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 23,
  name: "WN-24",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 24,
  name: "WN-25",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 25,
  name: "WN-26",
  post: "Soldier",
  image: "stromtrooper2.png",
  parent: 3
},
{
  id: 26,
  name: "KN-19",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 4
},
{
  id: 27,
  name: "KN-20",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 4
},
{
  id: 28,
  name: "KN-21",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 4
},
{
  id: 29,
  name: "KN-22",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 4
},
{
  id: 30,
  name: "KN-22",
  post: "Soldier",
  image: "stromtrooper.png",
  parent: 29
}
]


var header, main, body;

var states = [];

var units_in_range = [];

var unit_id;

var counter = 0,
    flag = false;

var count_circle;

function returnState(){
    body.innerHTML = states.pop();
    body.style.overflowY = "hidden";
    units_in_range = [];
    counter =0;
    lightning("light");
}

function decreaseOpacity(opacity){
    var speed = 0.3;
    return String(opacity - speed);
}

function saveState(){
    states.push(body.innerHTML);
}

function getNextUnitInRange(){
    getUnitInRangeArray();
    lightning("black");
    var unit;
    if(counter < units_in_range.length){
        unit = units_in_range[counter];
        if(getIdOfMain() == unit.id){
            counter++;
            unit = units_in_range[counter];
        }
        if(counter != units_in_range.length){
        changeMainUnit(null, unit.id);
        showArmy(null, unit.id);
        counter++;
        }
    }
    if(counter == units_in_range.length){
        counter = 0;
        unit = units_in_range[counter];
        changeMainUnit(null, unit.id);
        showArmy(null, unit_id);
        counter++;
    }
}

function getUnitInRangeArray(){
    var id = getIdOfMain(),
        parent_id = array[id].parent;
    for(var i = 0; i< array.length; i++)
        if(array[i].parent == parent_id)
            units_in_range.push(array[i]);
}

function getIdOfMain(){
    var elem = document.getElementsByClassName("mainUnit")[0];
    var id;
    var name = elem.childNodes[1].innerHTML;
    for(var i = 0; i< array.length; i++)
        if(array[i].name == name){
            id = array[i].id;
            break;
        }
    return id;
}

function getArrayOfUnits(){
    var array = document.getElementsByClassName("unit");
    return array;
}

function getStyle(elem){
if(window.getComputedStyle) return getComputedStyle(elem, null);
else return elem.currentStyle;
}

function showArmy(this_unit, this_id){
    header = document.getElementById('test');
    main = document.getElementsByTagName("main")[0];
    body = document.getElementsByTagName("body")[0];
    units_in_range = [];
    
    if(this_unit != null){
        saveState();
        counter = 0;
        changeMainUnit(this_unit);
        var height = getStyle(header).height;
        header.style.height = decreaseHeight(height, 3);
        height = getStyle(main).height;
        main.style.height = increaseHeight(height);
    }
    var arrows = document.getElementsByClassName("backArrow");
    arrows[0].style.display = "block";
    arrows[1].style.display = "block";
    
    var back = document.getElementsByClassName("backButton")[0];
    back.style.display = "block";
    
    main.innerHTML = "";
    var army = formArmy(unit_id);
    for(var i =0; i<army.length; i++)
            main.innerHTML += army[i];
    
    var elem_array = [];
    for(var i = 0; i< array.length; i++)
        {
            var elem = document.getElementById('unit_'+i);
            if(elem){
                elem_array.push(elem);
                changeAvatar(elem.firstChild, array[i].image);
                elem.style.cursor = "pointer";
                if(!countChildren(i))
                    elem.style.cursor = "default";
                showCountCircles(elem, i);
            }
        }
    if(elem_array.length >4){
        body.style.overflowY = "visible";
    }
}

function showCountCircles(unit_element, unit_id){
    var circle;
    circle = count_circle.cloneNode(true);
    if(countChildren(unit_id)){
    circle.innerHTML = countChildren(unit_id);
    unit_element.appendChild(circle);
    }
}

function countChildren(unit_id){
    var k = 0;
    for(var i = 0; i< array.length; i++)
        if(array[i].parent == unit_id){
            k++;
            k += countChildren(array[i].id);
        }
    return k;
}
    
function formArmy(parent_id){
    var army = [];
    var j = 0, k = 0;
    var elements = [];
        for(var i = 0; i< array.length; i++)
            if(array[i].parent == parent_id){
                army[k] = formUnit(array[i].id, array[i].name, array[i].post);
                k++;
            }
    return army;
}



function formUnit(id, name, post){
    var pattern;
    if(countChildren(id))
        pattern = "<div class='unit' id='unit_" 
        +id + "' onclick='showArmy(this)'><div class='unit__circleIcon circleIcon'></div><h2>" 
        + name + "</h2> <p>" + post + "</p></div>";
    if(!countChildren(id))
        pattern = "<div class='unit' id='unit_" 
        +id + "' ><div class='unit__circleIcon circleIcon'></div><h2>" 
        + name + "</h2> <p>" + post + "</p></div>";
    return pattern;
}

function formMainUnit(name, post){
    var pattern = "<div class='mainUnit__circleIcon circleIcon'></div><h2>" 
        + name + "</h2> <p>" + post + "</p>";
    return pattern;
}

function getId(string_id){
    var id = "";
    for(var i = 0; i< string_id.length; i++)
        if(Number(string_id[i]))
           id += string_id[i]; 
    return id;
}


function changeMainUnit(this_unit, this_id){
    if(this_unit != undefined && this_unit != null){
    var id = getId(this_unit.id);
    unit_id = Number(id);
    }
    else{
        unit_id = this_id;
    }
    var name = array[unit_id].name,
        post = array[unit_id].post;
    
    var main_unit = document.getElementsByClassName("mainUnit")[0];
    var newMainUnit = formMainUnit(name, post);
    main_unit.innerHTML = newMainUnit;
    
    var main_avatar = main_unit.firstChild;
    changeAvatar(main_avatar, array[unit_id].image);
    var height = getStyle(main_avatar).height;
    if(unit_id <2)
       main_avatar.style.height = decreaseHeight(height,3.5);
    if(unit_id >1)
        main_avatar.style.height = decreaseHeight(height,4.5);
    var width = main_avatar.style.height;
    main_avatar.style.width = width;
}

function changeAvatar(element, path){
    element.style.background = "url(images/avatars/" + path + ") rgba(0,0,0,0.5)";
    element.style.backgroundSize = "contain";
    element.style.backgroundPosition = "center";
}

function increaseHeight(style_height){
    var height = style_height.slice(0, -2);
    height = (Number(height)/2.5) *3;
    return style_height = height + "px";
}


function decreaseHeight(style_height, num){
    var height = style_height.slice(0, -2);
    height = (Number(height)/num) *2.5;
    return style_height = height + "px";
}

function lightning(blackOrLight){
    var opacity;
    switch(blackOrLight)
    {
        case "black":
            var block = document.getElementsByClassName("flashBlockBlack")[0];
            break;
        case "light":
            var block = document.getElementsByClassName("flashBlockLight")[0];
            break;
    }
    
    block.style.display = "block";
    
    var timerId = setInterval(function() {
        opacity = getStyle(block).opacity;
        opacity = decreaseOpacity(opacity);
        block.style.opacity = opacity;    
    }, 60);

    setTimeout(function() {
      clearInterval(timerId);
        block.style.display = "none";
        block.style.opacity = "1";
    }, 1200);
}
