(function () {

    var component = {

        name: 'calender',
        version: [1, 0, 0],

        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',
        // ccm: '//ccmjs.github.io/ccm/ccm.js',

        config: {
            html: {
                main: {
                    id: 'main',
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
                                            tag: 'li' ,
                                            class: 'prev' ,
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
                            tag:'ul',
                            class: 'weekdays',
                            id:'weekdays'
                        },
                        {
                            tag:'ul',
                            class: 'days',
                            id: 'days'
                        }

                    ]
                }
            },
            css: ["ccm.load", "./calender.css"],

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

            };


            this.start = async () => {
                const calender = $.html(self.html.main, {
                    next: function (e) {
                        month++;
                        if(month === 12){
                            month = 0;
                            year++;
                        }
                        createMonth(month, year);
                        createday(year, month);
                    },
                    prev: function (e) {
                        month--;
                        if(month < 0){
                            month =11;
                            year--;

                        }
                        createMonth(month, year);
                        createday(year, month);

                    }

                });
                createWeekdays();
                const date = new Date();
                createday(date.getFullYear(), date.getMonth());
                let month= date.getMonth();
                let year = date.getFullYear();
                createMonth(month, year);

                // set content of own website area
                $.setContent(self.element, calender);

                function createWeekdays(){
                    const weekdays = calender.querySelector('#weekdays');
                    const days =['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag' ,'Freitag', 'Samstag', 'Sonntag'];

                    /*
                    days.forEach(day => {
                        const li = document.createElement('li');
                        li.innerText = day;
                        weekdays.appendChild(li);
                    });

                     */


                    for(let i = 0; i < days.length; ++i ){
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
                    const firstDayOfMonth = new Date(year, month ,1).getDay();
                    for(let i = 1; i <firstDayOfMonth ; ++i){
                        const li = document.createElement("li");
                        li.innerText = "";
                        day.appendChild(li);
                    }
                    const numberOfDays = new Date(year, month + 1, 0).getDate();
                    let isCurrentDay = false ;
                    if(date.getFullYear() === year && date.getMonth() === month){
                        isCurrentDay = true;

                    }
                    const currentDay = date.getDate();
                    for(let i=1 ; i<= numberOfDays ; ++i){

                        const li = document.createElement("li");
                        if(isCurrentDay && currentDay=== i){
                            const span = document.createElement("span");
                            span.classList.add('active');
                            span.innerText = i;
                            li.appendChild(span);
                        }else{
                            li.innerText = i;
                        }

                        day.appendChild(li);

                    }

                }

                function createMonth(i,year) {
                    const months =['Januar', 'Februar', 'M'+'&#228;'+'rz',
                        'April', 'Mai','Juni', 'Juli', 'August',
                        'September', 'Oktober', 'November','Dezember'];
                    const month = calender.querySelector('#month-value');
                    //const i = new Date().getMonth();
                    const m = months[i];
                    const span = document.createElement("span");
                    span.style.fontSize = "18px";
                    span.innerText = year;

                    month.innerHTML = m + '<br>';
                    month.appendChild(span);



                }

            };



        }

    };



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
