/**
 * @overview ccm component to display calendar
 * @author hajar menssouri <hajar.menssouri@smail.inf.h-brs.de>, 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * */


(function () {

    var component = {

        name: 'calendar',
        version: [2, 0, 0],

        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',


        config: {
            db: ["ccm.store", { name: 'ccm-calendar' }],
            html: {
                main: {
                    id: 'main',
                    name: create_UUID(),
                    inner: [
                        {
                            tag: 'div',
                            class: 'month',
                            id: 'month-container',
                            inner: [
                                {
                                    tag: 'ul',
                                    inner: [
                                        {
                                            tag: 'li',
                                            class: 'prev',
                                            inner: '&#10094;',
                                            onclick: '%prev%'


                                        },
                                        {
                                            tag: 'li',
                                            class: 'next',
                                            id: 'next-btn',
                                            onclick: '%next%',
                                            inner: '&#10095;'
                                        },
                                        {
                                            tag: 'li',
                                            id: 'month-value'

                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            tag: 'ul',
                            class: 'weekdays',
                            id: 'weekdays'
                        },
                        {
                            tag: 'ul',
                            class: 'days',
                            id: 'days'
                        },
                        {
                            id: 'id01',
                            class: 'modal',
                            inner: [

                                {
                                    tag: 'div',
                                    class: 'modal-content',
                                    inner: [
                                        {
                                            tag: 'div',
                                            class: 'container',
                                            inner: [
                                                {
                                                    id: 'todo',
                                                    tag: 'div',
                                                    inner: [
                                                        {
                                                        class: 'header',
                                                        id: 'todo-header',

                                                        inner: [
                                                            {
                                                                tag: 'h2',
                                                                style: 'margin:5px',
                                                                inner: 'My To Do List'
                                                            },
                                                            {
                                                                tag: 'input',
                                                                type: 'text',
                                                                id: 'myInput',
                                                                placeholder: 'Title...'

                                                            },
                                                            {
                                                                tag: 'span',
                                                                onclick: '%createElement%',
                                                                class: 'addBtn',
                                                                inner: 'Add'
                                                            }

                                                        ]
                                                    },
                                                        {
                                                            tag: 'ul',
                                                            id: 'myUL'
                                                        }
                                                    ]
                                                }

                                            ]

                                        }

                                    ]


                                }
                            ]

                        }

                    ]
                }
            },
            css: ["ccm.load", "resources/calendar.css"]

        },

        Instance: function () {

            /**
             * own reference for inner functions
             * @type {Instance}
             */
            const self = this;

            /**
             * shortcut to help functions
             * @type {Object.<string,function>}
             */
            let $;

            /**
             * init is called once after all dependencies are solved and is then deleted
             */
            this.init = async () => {

                // set shortcut to help functions
                $ = this.ccm.helper;
                const cal = $.html(self.html.main);
                cal.name = create_UUID();
            };


            this.start = async () => {
                const calender = $.html(self.html.main, {
                    next: function (e) {
                        month++;
                        if (month === 12) {
                            month = 0;
                            year++;
                        }
                        createMonth(month, year);
                        createday(year, month);
                    },
                    prev: function (e) {
                        month--;
                        if (month < 0) {
                            month = 11;
                            year--;

                        }
                        createMonth(month, year);
                        createday(year, month);

                    },
                    createElement: function (e) {
                        insertElement();

                    }


                });
                let selectedDay;
                const modal = calender.querySelector('#id01');
                createWeekdays();
                const date = new Date();
                createday(date.getFullYear(), date.getMonth());
                let month = date.getMonth();
                let year = date.getFullYear();
                createMonth(month, year);


                calender.onclick = function(e){
                    if(e.target === modal){
                        modal.style.display = 'none';
                    }
                }

                let close = calender.querySelector(".close");

                var list = calender.querySelector('#myUL');
                list.addEventListener('click', function (ev) {
                    if (ev.target.tagName === 'LI') {
                        ev.target.classList.toggle('checked');
                    }
                }, false);
                // set content of own website area
                $.setContent(self.element, calender);

                function createWeekdays() {
                    const weekdays = calender.querySelector('#weekdays');
                    const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];


                    for (let i = 0; i < days.length; ++i) {
                        let day = days[i];
                        const li = document.createElement('li');
                        li.innerText = day;
                        weekdays.appendChild(li);

                    }


                }

                function createday(year, month) {
                    const day = calender.querySelector('#days');
                    day.innerHTML = "";
                    const date = new Date();
                    const firstDayOfMonth = new Date(year, month, 1).getDay();
                    for (let i = 1; i < firstDayOfMonth; ++i) {
                        const li = document.createElement("li");
                        li.innerText = "";
                        day.appendChild(li);
                    }
                    const numberOfDays = new Date(year, month + 1, 0).getDate();
                    let isCurrentDay = false;
                    if (date.getFullYear() === year && date.getMonth() === month) {
                        isCurrentDay = true;

                    }
                    const currentDay = date.getDate();
                    for (let i = 1; i <= numberOfDays; ++i) {
                        let dayid =  "day"+i + "" + (month+ 1) +""+ year;
                        const li = document.createElement("li");
                        li.id = dayid;
                        li.addEventListener('click',function(e){
                            calender.querySelector("#myUL").innerHTML = '';
                            selectedDay =  "day"+i + "" + (month+ 1) +""+ year;
                            console.log(selectedDay)
                            self.db.get(selectedDay).then(
                                existToDos =>{
                                    console.log(existToDos)

                                    if(existToDos && existToDos.value){
                                        setElement(existToDos.value);

                                    }
                                    calender.querySelector('#id01').style.display='block';
                                }
                            )

                        })
                        const span = document.createElement("span");
                        self.db.get().then(
                            data=> {
                                if(data){
                                    data.forEach(item => {
                                        if(item.key=== dayid){
                                            span.classList.add("mark");
                                        }
                                    })
                                }

                            }
                        )
                        //li.onclick = "document.getElementById('id01').style.display='block'";
                        if (isCurrentDay && currentDay === i) {
                           // const span = document.createElement("span");
                            span.classList.add('active');
                            span.innerText = i;
                            li.appendChild(span);
                        } else {
                           // const span = document.createElement("span");

                            span.innerText = i;
                            li.appendChild(span);
                        }

                        day.appendChild(li);

                    }

                }

                function createMonth(i, year) {
                    const months = ['Januar', 'Februar', 'M' + '&#228;' + 'rz',
                        'April', 'Mai', 'Juni', 'Juli', 'August',
                        'September', 'Oktober', 'November', 'Dezember'];
                    const month = calender.querySelector('#month-value');
                    //const i = new Date().getMonth();
                    const m = months[i];
                    const span = document.createElement("span");
                    span.style.fontSize = "18px";
                    span.innerText = year;

                    month.innerHTML = m + '<br>';
                    month.appendChild(span);


                }

                function setElement(toDos){
                    console.log("set element")
                    for(let i= 0; i< toDos.length ; i++){
                        console.log("inner for")
                        var li = document.createElement("li");
                        var inputValue = toDos[i];
                        console.log(inputValue)
                        var t = document.createTextNode(inputValue);
                        li.appendChild(t);
                        calender.querySelector("#myUL").appendChild(li);
                        console.log(li)
                        var span = document.createElement("SPAN");
                        var txt = document.createTextNode("\u00D7");
                        span.className = "close";
                        span.appendChild(txt);
                        span.onclick = function () {
                            li.style.display = "none";
                        }
                        li.appendChild(span);
                    }

                }

                function insertElement() {
                    var li = document.createElement("li");
                    var inputValue = calender.querySelector("#myInput").value;
                    var t = document.createTextNode(inputValue);
                    li.appendChild(t);
                    if (inputValue === '') {
                        alert("You must write something!");
                    } else {
                        calender.querySelector("#myUL").appendChild(li);
                    }
                    let toDos = [];
                    self.db.get(selectedDay).then(
                        existToDos =>{
                            if(existToDos){
                                existToDos.value.push(inputValue);
                                self.db.set({key:selectedDay, value: existToDos.value});
                            }else{
                                toDos.push(inputValue);
                                self.db.set({key:selectedDay, value: toDos});
                                const day = calender.querySelector("#"+ selectedDay);
                                const markSpan = day.querySelector("span");
                                markSpan.classList.add("mark");
                            }
                            selectedDay = undefined;
                        }
                    )

                    calender.querySelector("#myInput").value = "";

                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close";
                    span.appendChild(txt);
                    span.onclick = function () {
                        li.style.display = "none";
                    }
                    li.appendChild(span);


                }

            };


        }

    };

    function create_UUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return 'calendar-' + uuid;
    }

    function p() {
        window.ccm[v].component(component)
    }

    var f = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[f]) window.ccm.files[f] = component; else {
        var n = window.ccm && window.ccm.components[component.name];
        n && n.ccm && (component.ccm = n.ccm), "string" == typeof component.ccm && (component.ccm = {url: component.ccm});
        var v = component.ccm.url.split("/").pop().split("-");
        if (v.length > 1 ? (v = v[1].split("."), v.pop(), "min" === v[v.length - 1] && v.pop(), v = v.join(".")) : v = "latest", window.ccm && window.ccm[v]) p(); else {
            var e = document.createElement("script");
            document.head.appendChild(e), component.ccm.integrity && e.setAttribute("integrity", component.ccm.integrity), component.ccm.crossorigin && e.setAttribute("crossorigin", component.ccm.crossorigin), e.onload = function () {
                p(), document.head.removeChild(e)
            }, e.src = component.ccm.url
        }
    }
}());
