// <https://stackoverflow.com/a/13052187>
Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
// </https://stackoverflow.com/a/13052187>


function set_date(){
    document.getElementById('datefield').value=new Date().toDateInputValue();
}


function submit_event() {

        let button = document.getElementById('submitEvent');
        let status = document.getElementById('status');

        status.textContent = 'Collection bucket empty!';
        status.style.color = '#ff1a1a';
        button.style.background = '#ff1a1a';
}


function escape_html(text) {
    return text.replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/"/g, "&quot;").replace(/&/g, "&#38;").replace(/'/g, "&#039;").replace(/"/g, "&#34;");
}


function delete_attribute(info){
    console.log(`Removing ${id}.`)
}


function delete_all_attributes(){
    
    chrome.storage.local.remove("attributes");
    populate_attribute_table()
}


function populate_attribute_table(){
    
    let attributes = [];
    chrome.storage.local.get("attributes", function(result){
        
        let attributes = result.attributes;
        
        if(typeof(attributes) === 'undefined' && !(attributes instanceof Array)) {
            attributes = [{"category": "empty", "type": "empty", "value": "empty"}];
        }
        
        //console.log(JSON.stringify(attributes));
        //[{"category":"Internal reference","type":"link","value":"Creates a MISP event from sel"},
        // {"category":"Persistence mechanism","type":"filename","value":"Creates a MISP event from selected IoCs"}]
        
        let iocarea = document.getElementById('iocarea');
        iocarea.innerHTML = "";
        
        let tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute("class", "ioctable");
        
        let tbdy = document.createElement('tbody');
        
        // table header
        let tr = document.createElement('tr');
        tr.setAttribute("class", "ioctableheader");
        
        // <for element in object>
        for (let key in attributes[0]) {
            let td = document.createElement('th');
            td.innerHTML = key;
            tr.appendChild(td);
        }// </for element in object>
        let td = document.createElement('th');
        td.innerHTML = "rm";
        tr.appendChild(td);
        tbdy.appendChild(tr);
        
        // iterate over attributes
        // <for elements in array>
        for (let i = 0; i < attributes.length; i++) {
            let tr = document.createElement('tr');
            tr.setAttribute("class", "ioctable");
            
            // <for element in object>
            for (let key in attributes[i]) {
                let td = document.createElement('td');
                td.innerHTML = escape_html(attributes[i][key]);

                tr.appendChild(td);
            }// </for element in object>
            
            let td = document.createElement('td');
            let btn = document.createElement("button");
            btn.setAttribute("class", "xbutton");
            btn.setAttribute("id", `${i}`);

            tr.appendChild(btn);
            
            tbdy.appendChild(tr);
            
        }// </end for elements in array>
        
        tbl.appendChild(tbdy);
        iocarea.appendChild(tbl);
    });
}

document.addEventListener('DOMContentLoaded', set_date);
document.addEventListener('DOMContentLoaded', populate_attribute_table);
document.getElementById('submitEvent').addEventListener('click', submit_event);
document.getElementById('clearAttributes').addEventListener('click', delete_all_attributes);
