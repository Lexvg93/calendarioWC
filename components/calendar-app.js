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
            <div class="calendar">
                <calendar-header></calendar-header>
                <calendar-grid></calendar-grid>
            </div>
        `;
    }

    connectedCallback(){
        this.header = this.shadowRoot.querySelector('calendar-header');
        this.grid = this.shadowRoot.querySelector('calendar-grid');

        this.sincronizar();
        this.escucharEventos();
    }

    sincronizar(){
        if(!this.isConnected) return;

        const wrapper = this.shadowRoot.querySelector('.calendar');

        //tema
        wrapper.classList.remove('claro', 'oscuro');
        wrapper.classList.add(this.estado.theme);

        //header
        this.header.setAttribute('year', this.estado.year);
        this.header.setAttribute('month', this.estado.month);

        //grid
        this.grid.setAttribute('year', this.estado.year);
        this.grid.setAttribute('month', this.estado.month);
        this.grid.setAttribute('events',JSON.stringify(this.estado.events))
    }

    escucharEventos(){
        this.addEventListener('next-month', ()=> {
            if(this.estado.month === 11){
                this.estado.month = 0;
                this.estado.year++;
            }else{
                this.estado.month++;
            }
        });
        this.addEventListener('prev-month', ()=>{
            if(this.estado.month === 0){
                this.estado.month = 11;
                this.estado.year--;
            }else{
                this.estado.month--;
            }
        });

        this.addEventListener('select-day',(e)=>{
            this.estado.selectedDay = e.detail.day;
        })
    }
}
customElements.define('calendar-app',CalendarApp);
