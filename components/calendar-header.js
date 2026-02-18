class CalendarHeader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});

        this.shadowRoot.innerHTML = `
            <style>
                .header{
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                    margin-bottom: 12px;
                }

                button {
                    cursor:pointer;
                    padding: 4px 8px;
                }

                .title{
                    font-weight: bold;
                }

                <div class="header">
                    <button id="prev">←</button>
                    <div class="title"></div>
                    <button id="next">→</button>
                </div>
            </style>
        `;
    }
}