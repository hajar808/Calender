(function () {

    var component = {

        name: 'calender',
        version: [1, 0, 0],

        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',
        // ccm: '//ccmjs.github.io/ccm/ccm.js',

        config: {
            html: {
                main: {
                    id: 'main'
                }
            },
            css: ["ccm.load", "https://github.com/hajar808/Calender/blob/master/calender.css"],

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
                const calender = $.html(self.html.main);

                calender.innerHTML = ' <div class="month">      \n' +
                    '  <ul>\n' +
                    '    <li class="prev">&#10094;</li>\n' +
                    '    <li class="next">&#10095;</li>\n' +
                    '    <li>\n' +
                    '      Juli<br>\n' +
                    '      <span style="font-size:18px">2020</span>\n' +
                    '    </li>\n' +
                    '  </ul>\n' +
                    '</div>\n' +
                    '\n' +
                    '<ul class="weekdays">\n' +
                    '  <li>Mo</li>\n' +
                    '  <li>Tu</li>\n' +
                    '  <li>We</li>\n' +
                    '  <li>Th</li>\n' +
                    '  <li>Fr</li>\n' +
                    '  <li>Sa</li>\n' +
                    '  <li>Su</li>\n' +
                    '</ul>\n' +
                    '\n' +
                    '<ul class="days">  \n' +
                    '  <li>1</li>\n' +
                    '  <li>2</li>\n' +
                    '  <li>3</li>\n' +
                    '  <li>4</li>\n' +
                    '  <li>5</li>\n' +
                    '  <li>6</li>\n' +
                    '  <li>7</li>\n' +
                    '  <li>8</li>\n' +
                    '  <li>9</li>\n' +
                    '  <li><span class="active">10</span></li>\n' +
                    '  <li>11</li>\n' +
                    '  <li>12</li>\n' +
                    '  <li>13</li>\n' +
                    '  <li>14</li>\n' +
                    '  <li>15</li>\n' +
                    '  <li>16</li>\n' +
                    '  <li>17</li>\n' +
                    '  <li>18</li>\n' +
                    '  <li>19</li>\n' +
                    '  <li>20</li>\n' +
                    '  <li>21</li>\n' +
                    '  <li>22</li>\n' +
                    '  <li>23</li>\n' +
                    '  <li>24</li>\n' +
                    '  <li>25</li>\n' +
                    '  <li>26</li>\n' +
                    '  <li>27</li>\n' +
                    '  <li>28</li>\n' +
                    '  <li>29</li>\n' +
                    '  <li>30</li>\n' +
                    '  <li>31</li>\n' +
                    '</ul>';

    // set content of own website area
    $.setContent(self.element, calender);

};
  
      }
  
    };

function p() { window.ccm[v].component(component) } var f = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js"; if (window.ccm && null === window.ccm.files[f]) window.ccm.files[f] = component; else { var n = window.ccm && window.ccm.components[component.name]; n && n.ccm && (component.ccm = n.ccm), "string" == typeof component.ccm && (component.ccm = { url: component.ccm }); var v = component.ccm.url.split("/").pop().split("-"); if (v.length > 1 ? (v = v[1].split("."), v.pop(), "min" === v[v.length - 1] && v.pop(), v = v.join(".")) : v = "latest", window.ccm && window.ccm[v]) p(); else { var e = document.createElement("script"); document.head.appendChild(e), component.ccm.integrity && e.setAttribute("integrity", component.ccm.integrity), component.ccm.crossorigin && e.setAttribute("crossorigin", component.ccm.crossorigin), e.onload = function () { p(), document.head.removeChild(e) }, e.src = component.ccm.url } }
  }() );
