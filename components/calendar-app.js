class CalendarApp extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.estado = new Proxy({
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            selectedDay: null,
            events: {},
            theme: 'claro'
        },{
            set:(target, prop, value) =>{
                target[prop] = value;
                this.sincronizar();
                return true;
            }
        });

        this.shadowRoot.innerHTML = `
            <style>
                .calendar{
                    font-family: sans-serif;
                    border: 1px solid #333;
                    padding: 16px;
                    width:320px;
                }

                .calendar.claro {
                    background: #fff;
                    color: #222;
                }

                .calendar.oscuro {
                    background: #1e1e1e;
                    color: #f5f5f5;
                }
            </style>
        `;
    }
}
customElements.define('calendar-app',CalendarApp);
